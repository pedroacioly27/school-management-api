import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateGradeDto } from './dto/create-grade.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { Grade } from './entities/grade.entity';
import { Role } from 'src/common/enums/role.enum';
import { TeacherProfile } from 'src/users/entities/teacher-profile.entity';

@Injectable()
export class GradesService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Grade)
    private gradeRepository: Repository<Grade>,
    @InjectRepository(TeacherProfile)
    private teacherProfileRepository: Repository<TeacherProfile>,
  ) {}
  async create(dto: CreateGradeDto, req) {
    if (dto.value < 0 || dto.value > 10) {
      throw new BadRequestException('Grade must be between 0 and 10');
    }

    const student = await this.userRepository.findOne({
      where: { id: dto.studentId },
    });

    if (!student || student.role !== Role.STUDENT) {
      throw new NotFoundException('Student not found');
    }

    const teacherProfile = await this.teacherProfileRepository.findOne({
      where: { user: { id: req.user.sub } },
      relations: { user: true },
    });

    if (!teacherProfile) {
      throw new UnauthorizedException();
    }

    const grade = this.gradeRepository.create({
      value: dto.value,
      subject: teacherProfile.subject,
      student,
      teacher: teacherProfile.user,
    });

    await this.gradeRepository.save(grade);

    return {
      subject: grade.subject,
      value: grade.value,
      student: student.name,
      teacher: teacherProfile.user.name,
    };
  }
}
