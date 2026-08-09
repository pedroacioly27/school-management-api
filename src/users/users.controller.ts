import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from 'src/auth/auth.roles.guard';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post()
  @ApiOperation({ summary: 'Create a new student' })
  createStudent(@Body() data: CreateUserDto) {
    return this.usersService.createStudent(data);
  }

  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard, new RolesGuard(['DIRECTOR']))
  @ApiOperation({ summary: 'Create a teacher (Director only)' })
  @Post('teacher')
  createTeacher(@Body() data: CreateTeacherDto) {
    return this.usersService.createTeacher(data);
  }
}
