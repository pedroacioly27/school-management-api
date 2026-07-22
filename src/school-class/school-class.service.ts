import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SchoolClass } from './entities/school-class.entity';
import { Repository } from 'typeorm';
import { CreateSchoolClassDto } from './dto/school-class.dto';
import { UpdateSchoolClassDto } from './dto/update-school-class.dto';
import { StudentProfile } from 'src/users/entities/student-profile.entity';
import { TeacherProfile } from 'src/users/entities/teacher-profile.entity';

@Injectable()
export class SchoolClassService {
  constructor(
    @InjectRepository(SchoolClass)
    private readonly schoolClassRepository: Repository<SchoolClass>,
    @InjectRepository(StudentProfile)
    private readonly studentRepository: Repository<StudentProfile>,
    @InjectRepository(TeacherProfile)
    private readonly teacherRepository: Repository<TeacherProfile>,
  ) {}

  async create(data: CreateSchoolClassDto) {
    const classExists = await this.schoolClassRepository.findOne({
      where: {
        gradeLevel: data.gradeLevel,
        section: data.section,
      },
    });

    if (classExists) {
      throw new BadRequestException('Class already exists');
    }

    const newClass = this.schoolClassRepository.create(data);

    await this.schoolClassRepository.save(newClass);

    return newClass;
  }

  async findAll() {
    return this.schoolClassRepository.find({
      relations: { students: true, teachers: true },
    });
  }

  async findOne(id: number) {
    const schoolClass = await this.schoolClassRepository.findOne({
      where: { id },
      relations: {
        students: true,
        teachers: true,
      },
    });
    if (!schoolClass) {
      throw new NotFoundException('Class not found');
    }

    return schoolClass;
  }

  async update(id: number, data: UpdateSchoolClassDto) {
    const schoolClass = await this.findOne(id);

    Object.assign(schoolClass, data);

    await this.schoolClassRepository.save(schoolClass);

    return schoolClass;
  }

  async delete(id: number) {
    await this.findOne(id);
    await this.schoolClassRepository.delete(id);

    return { message: 'Class deleted sucessfully' };
  }

  private async findStudentOrFail(id: number) {
    const student = await this.studentRepository.findOne({
      where: { id },
      relations: { schoolClass: true, user: true },
    });

    if (!student) {
      throw new NotFoundException('Student not found');
    }

    return student;
  }

  async addStudent(classId: number, studentId: number) {
    const schoolClass = await this.findOne(classId);
    const student = await this.findStudentOrFail(studentId);

    if (student.schoolClass) {
      throw new BadRequestException('Student is already assigned to a class');
    }

    student.schoolClass = schoolClass;

    await this.studentRepository.save(student);

    return {
      student: student.user.name,
      gradeLevel: student.schoolClass.gradeLevel,
      section: student.schoolClass.section,
    };
  }

  async updateStudentClass(classId: number, studentId: number) {
    const schoolClass = await this.findOne(classId);

    const student = await this.findStudentOrFail(studentId);

    if (!student.schoolClass) {
      throw new BadRequestException('Student is not assigned to any class');
    }

    student.schoolClass = schoolClass;

    await this.studentRepository.save(student);

    return {
      student: student.user.name,
      gradeLevel: student.schoolClass.gradeLevel,
      section: student.schoolClass.section,
    };
  }

  async removeStudentFromClass(studentId: number) {
    const student = await this.findStudentOrFail(studentId);

    if (!student.schoolClass) {
      throw new BadRequestException('Student is not assigned to any class');
    }

    student.schoolClass = null;

    await this.studentRepository.save(student);

    return {
      message: 'Student removed from class successfully',
      student: student.user.name,
    };
  }

  private async findTeacherOrFail(id: number) {
    const teacher = await this.teacherRepository.findOne({
      where: { id },
      relations: { schoolClass: true, user: true },
    });
    if (!teacher) {
      throw new NotFoundException('Teacher not found');
    }

    return teacher;
  }

  async addTeacher(classId: number, teacherId: number) {
    const schoolClass = await this.findOne(classId);
    const teacher = await this.findTeacherOrFail(teacherId);

    if (teacher.schoolClass) {
      throw new BadRequestException('Teacher is already assigned to a class');
    }

    teacher.schoolClass = schoolClass;

    await this.teacherRepository.save(teacher);

    return {
      teacher: teacher.user.name,
      gradeLevel: teacher.schoolClass.gradeLevel,
      section: teacher.schoolClass.section,
    };
  }

  async updateTeacherClass(classId: number, teacherId: number) {
    const schoolClass = await this.findOne(classId);

    const teacher = await this.findTeacherOrFail(teacherId);

    if (!teacher.schoolClass) {
      throw new BadRequestException('Teacher is not assigned to any class');
    }

    teacher.schoolClass = schoolClass;

    await this.teacherRepository.save(teacher);

    return {
      teacher: teacher.user.name,
      gradeLevel: teacher.schoolClass.gradeLevel,
      section: teacher.schoolClass.section,
    };
  }

  async removeTeacherFromClass(teacherId: number) {
    const teacher = await this.findTeacherOrFail(teacherId);

    if (!teacher.schoolClass) {
      throw new BadRequestException('Teacher is not assigned to any class');
    }

    teacher.schoolClass = null;

    await this.teacherRepository.save(teacher);

    return {
      message: 'Teacher removed from class successfully',
      teacher: teacher.user.name,
    };
  }
}
