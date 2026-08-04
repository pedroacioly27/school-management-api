import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateGradeDto } from './dto/create-grade.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { Grade } from './entities/grade.entity';
import { TeacherProfile } from 'src/users/entities/teacher-profile.entity';
import { StudentProfile } from 'src/users/entities/student-profile.entity';
import { FilterGradeDto } from './dto/filter-grade.dto';
import { UpdateGradeDto } from './dto/update-grade.dto';
import { User } from 'src/users/entities/user.entity';
import {
  BimesterMap,
  BimesterReporter,
  SubjectMap,
  SubjectReport,
} from './interfaces/report.interface';
import { Role } from 'src/common/enums/role.enum';

@Injectable()
export class GradesService {
  constructor(
    @InjectRepository(StudentProfile)
    private readonly studentRepository: Repository<StudentProfile>,
    @InjectRepository(Grade)
    private readonly gradeRepository: Repository<Grade>,
    @InjectRepository(TeacherProfile)
    private readonly teacherProfileRepository: Repository<TeacherProfile>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async create(dto: CreateGradeDto, req) {
    const student = await this.studentRepository.findOne({
      where: { id: dto.studentId },
      relations: {
        schoolClass: true,
      },
    });

    if (!student) {
      throw new NotFoundException('Student not found');
    }

    if (!student.schoolClass) {
      throw new BadRequestException('Student has no class');
    }

    const teacherProfile = await this.teacherProfileRepository.findOne({
      where: { user: { id: req.user.sub } },
      relations: { schoolClass: true },
    });

    if (!teacherProfile) {
      throw new UnauthorizedException();
    }

    if (!teacherProfile.schoolClass) {
      throw new BadRequestException('Teacher has no class');
    }
    if (teacherProfile.schoolClass.id !== student.schoolClass.id) {
      throw new BadRequestException(
        'Teacher and student are not in the same class',
      );
    }

    const existingGrade = await this.gradeRepository.findOne({
      where: {
        student: { id: dto.studentId },
        subject: teacherProfile.subject,
        bimester: dto.bimester,
        gradeType: dto.gradeType,
      },
    });

    if (existingGrade) {
      throw new BadRequestException('Grade already exists');
    }

    const grade = this.gradeRepository.create({
      value: dto.value,
      subject: teacherProfile.subject,
      bimester: dto.bimester,
      gradeType: dto.gradeType,
      student,
      teacher: teacherProfile,
      schoolClass: student.schoolClass,
    });

    await this.gradeRepository.save(grade);

    return grade;
  }

  async findall(filters: FilterGradeDto, req) {
    const where: FindOptionsWhere<Grade> = {};

    const user = await this.userRepository.findOne({
      where: { id: req.user.sub },
      relations: { studentProfile: true },
    });
    if (!user) {
      throw new BadRequestException('You need to be logged in');
    }
    if (user.role === Role.STUDENT) {
      if (filters.studentId) {
        if (filters.studentId !== user.studentProfile.id) {
          throw new ForbiddenException('You can only see your own report');
        }
        where.student = { id: filters.studentId };
      }
      if (
        filters.classId &&
        user.studentProfile.schoolClass &&
        filters.classId === user.studentProfile.schoolClass.id
      ) {
        where.schoolClass = { id: filters.classId };
      }
    } else if (req.user.role === Role.TEACHER) {
      where.teacher = { user: { id: req.user.sub } };
      if (filters.studentId) {
        where.student = { id: filters.studentId };
      }
      if (
        filters.classId &&
        user.teacherProfile.schoolClass &&
        filters.classId === user.teacherProfile.schoolClass.id
      ) {
        where.schoolClass = { id: filters.classId };
      }
    } else if (req.user.role === Role.DIRECTOR) {
      if (filters.studentId) {
        where.student = { id: filters.studentId };
      }
      if (filters.classId) {
        where.schoolClass = { id: filters.classId };
      }
    }

    if (filters.bimester) {
      where.bimester = filters.bimester;
    }
    if (req.user.role === Role.TEACHER) {
      where.teacher = { user: { id: req.user.sub } };
    }

    return this.gradeRepository.find({
      where,
      relations: { student: true, teacher: true, schoolClass: true },
    });
  }

  async update(id: number, data: UpdateGradeDto, req) {
    const grade = await this.gradeRepository.findOne({
      where: { id },
      relations: { teacher: { user: true } },
    });

    if (!grade) {
      throw new NotFoundException('Grade not found');
    }

    if (grade.teacher.user.id !== req.user.sub) {
      throw new UnauthorizedException('You cannot update this grade');
    }

    if (data.value !== undefined) {
      grade.value = data.value;
    }

    if (data.gradeType !== undefined) {
      grade.gradeType = data.gradeType;
    }

    return this.gradeRepository.save(grade);
  }

  async delete(id: number, req) {
    const grade = await this.gradeRepository.findOne({
      where: { id },
      relations: { teacher: { user: true } },
    });

    if (!grade) {
      throw new NotFoundException('Grade not found');
    }

    if (grade.teacher.user.id !== req.user.sub) {
      throw new UnauthorizedException('You cannot delete this grade');
    }

    await this.gradeRepository.remove(grade);

    return { message: 'Grade deleted successfully' };
  }

  async getReportCard(studentId: number, req) {
    const loggedUser = await this.userRepository.findOne({
      where: { id: req.user.sub },
      relations: { studentProfile: true, teacherProfile: true },
    });
    const student = await this.studentRepository.findOne({
      where: { id: studentId },
    });

    if (!student) {
      throw new NotFoundException('Student not found');
    }

    if (!loggedUser) {
      throw new UnauthorizedException('Unauthorized');
    }

    if (loggedUser.role === Role.STUDENT) {
      if (student.id !== studentId) {
        throw new ForbiddenException('You can only see your own report');
      }
    }
    if (loggedUser.role === Role.TEACHER) {
      if (loggedUser.teacherProfile.schoolClass !== student.schoolClass) {
        throw new ForbiddenException(
          'You cannot view the grades of students from other classes',
        );
      }
    }
    const grades = await this.gradeRepository.find({
      where: { student: { id: student.id } },
    });
    const subjectsMap: Record<string, SubjectMap> = {};

    for (const grade of grades) {
      if (!subjectsMap[grade.subject]) {
        subjectsMap[grade.subject] = {
          subject: grade.subject,
          bimesters: {},
        };
      }
      const subject = subjectsMap[grade.subject];

      if (!subject.bimesters[grade.bimester]) {
        subject.bimesters[grade.bimester] = {
          bimester: grade.bimester,
          grades: [],
        };
      }
      subject.bimesters[grade.bimester].grades.push(+grade.value);
    }
    const result: SubjectReport[] = Object.values(subjectsMap).map(
      (subject: SubjectMap) => {
        const bimesterOrder = {
          FIRST: 1,
          SECOND: 2,
          THIRD: 3,
          FOURTH: 4,
        };
        const bimesters: BimesterReporter[] = Object.values(subject.bimesters)
          .map((bimester: BimesterMap) => {
            const average = Number(
              (
                bimester.grades.reduce((sum, value) => sum + value, 0) /
                bimester.grades.length
              ).toFixed(2),
            );

            return {
              ...bimester,
              average,
            };
          })
          .sort((a, b) => {
            return bimesterOrder[a.bimester] - bimesterOrder[b.bimester];
          });
        const finalAverage: number = Number(
          (
            bimesters.reduce((sum, b) => sum + b.average, 0) / bimesters.length
          ).toFixed(2),
        );

        return {
          subject: subject.subject,
          bimesters,
          finalAverage,
          status: finalAverage >= 6 ? 'APPROVED' : 'FAILED',
        };
      },
    );
    return result;
  }
}
