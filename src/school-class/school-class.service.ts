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
    const schoolClass = await this.findOne(id);

    await this.schoolClassRepository.delete(schoolClass.id);

    return { message: 'Class deleted sucessfully' };
  }

  async addStudent(classId: number, studentId: number) {
    const schoolClass = await this.findOne(classId);
    const student = await this.studentRepository.findOne({
      where: { id: studentId },
      relations: { schoolClass: true, user: true },
    });

    if (!student) {
      throw new NotFoundException('Student not found');
    }

    if (student.schoolClass) {
      throw new BadRequestException('Student is already in a class');
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
    const schoolClass = await this.findOne(studentId);

    const student = await this.studentRepository.findOne({
      where: { id: classId },
      relations: { schoolClass: true, user: true },
    });
    if (!student) {
      throw new NotFoundException('Student not found');
    }

    if (student.schoolClass) {
      throw new BadRequestException('Student is not yet in any class');
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
    const student = await this.studentRepository.findOne({
      where: { id: studentId },
      relations: { schoolClass: true },
    });

    if (!student) {
      throw new NotFoundException('Student not found');
    }

    if (!student.schoolClass) {
      throw new BadRequestException('Student is not in any class');
    }

    student.schoolClass = null;

    await this.studentRepository.save(student);

    return { message: 'Student removed from class successfully', studentId };
  }

  async addTeacher(classId: number, teacherId: number) {
    const schoolClass = await this.findOne(classId);
    const teacher = await this.teacherRepository.findOne({
      where: { id: teacherId },
      relations: { schoolClass: true },
    });
    if (!teacher) {
      throw new NotFoundException('Teacher not found');
    }

    if (teacher.schoolClass) {
      throw new BadRequestException('Student is not yet in any class');
    }

    teacher.schoolClass = schoolClass;

    return this.teacherRepository.save(teacher);
  }
}
