import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from 'src/auth/auth.roles.guard';
import { CreateTeacherDto } from './dto/create-teacher.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post()
  create(@Body() data: CreateUserDto) {
    return this.usersService.create(data);
  }

  @UseGuards(AuthGuard, new RolesGuard(['DIRECTOR']))
  @Post('teacher')
  createTeacher(@Body() data: CreateTeacherDto) {
    return this.usersService.createTeacher(data);
  }
}
