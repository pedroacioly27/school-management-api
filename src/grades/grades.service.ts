import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateGradeDto } from './dto/create-grade.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Grade } from './entities/grade.entity';
import { TeacherProfile } from 'src/users/entities/teacher-profile.entity';
import { StudentProfile } from 'src/users/entities/student-profile.entity';

@Injectable()
export class GradesService {
  constructor(
    @InjectRepository(StudentProfile)
    private studentRepository: Repository<StudentProfile>,
    @InjectRepository(Grade)
    private gradeRepository: Repository<Grade>,
    @InjectRepository(TeacherProfile)
    private teacherProfileRepository: Repository<TeacherProfile>,
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
}
