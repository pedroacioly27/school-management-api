import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { TeacherProfile } from './entities/teacher-profile.entity';
import { StudentProfile } from './entities/student-profile.entity';
import { CreateUserDto } from './dto/create-user.dto';
import bcrypt from 'bcrypt';
import { Role } from 'src/common/enums/role.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(TeacherProfile)
    private teacherProfileRepository: Repository<TeacherProfile>,

    @InjectRepository(StudentProfile)
    private studentProfileRepository: Repository<StudentProfile>,
  ) {}

  
  async create(data: CreateUserDto) {
    const userExists = await this.userRepository.findOneBy({
      email: data.email,
    });
    if (userExists) {
      throw new BadRequestException('email already in use');
    }
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = this.userRepository.create({
      name: data.name,
      email: data.email,
      password: hashedPassword,
      role: Role.STUDENT,
    });
    const savedUser = await this.userRepository.save(user);

    if (savedUser.role === Role.STUDENT) {
      const studentProfile = this.studentProfileRepository.create({
        user: savedUser,
      });
      await this.studentProfileRepository.save(studentProfile);
    }
    const { password: _, ...newUser } = user;

    return newUser;
  }

  async createTeacher(data: CreateUserDto) {
    const userExists = await this.userRepository.findOneBy({
      email: data.email,
    });
    if (userExists) {
      throw new BadRequestException('Email already in use');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = this.userRepository.create({
      name: data.name,
      email: data.email,
      password: hashedPassword,
      role: Role.TEACHER,
    });

    const savedUser = await this.userRepository.save(user);

    const teacherProfile = this.teacherProfileRepository.create({
      user: savedUser,
    });

    await this.teacherProfileRepository.save(teacherProfile);

    const { password: _, ...newTeacher } = savedUser;

    return newTeacher;
  }
}
