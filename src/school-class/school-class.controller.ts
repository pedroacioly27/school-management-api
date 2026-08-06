import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateSchoolClassDto } from './dto/school-class.dto';
import { SchoolClassService } from './school-class.service';
import { UpdateSchoolClassDto } from './dto/update-school-class.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/auth.roles.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('classes')
export class SchoolClassController {
  constructor(private readonly classService: SchoolClassService) {}
  @ApiBearerAuth()
  @UseGuards(AuthGuard, new RolesGuard(['DIRECTOR']))
  @Post()
  create(@Body() data: CreateSchoolClassDto) {
    return this.classService.create(data);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, new RolesGuard(['DIRECTOR']))
  @Get()
  findAll() {
    return this.classService.findAll();
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, new RolesGuard(['DIRECTOR']))
  @Get(':ClassId')
  findOne(@Param('ClassId', ParseIntPipe) ClassId: number) {
    return this.classService.findOne(ClassId);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, new RolesGuard(['DIRECTOR']))
  @Patch(':ClassId')
  update(
    @Param('ClassId', ParseIntPipe) ClassId: number,
    @Body() data: UpdateSchoolClassDto,
  ) {
    return this.classService.update(ClassId, data);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, new RolesGuard(['DIRECTOR']))
  @Delete(':ClassId')
  delete(@Param('ClassId', ParseIntPipe) ClassId: number) {
    return this.classService.delete(ClassId);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, new RolesGuard(['DIRECTOR']))
  @Post(':classId/students')
  addStudent(
    @Param('classId', ParseIntPipe) classId: number,
    @Body('studentId', ParseIntPipe) studentId: number,
  ) {
    return this.classService.addStudent(classId, studentId);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, new RolesGuard(['DIRECTOR']))
  @Delete('students/:studentId/class')
  removeStudent(@Param('studentId', ParseIntPipe) studentId: number) {
    return this.classService.removeStudentFromClass(studentId);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, new RolesGuard(['DIRECTOR']))
  @Patch('students/:studentId/class')
  updateStudentClass(
    @Param('studentId', ParseIntPipe) studentId: number,
    @Body('classId', ParseIntPipe) classId: number,
  ) {
    return this.classService.updateStudentClass(classId, studentId);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, new RolesGuard(['DIRECTOR']))
  @Post(':classId/teachers')
  addTeacher(
    @Param('classId', ParseIntPipe) classId: number,
    @Body('teacherId', ParseIntPipe) teacherId: number,
  ) {
    return this.classService.addTeacher(classId, teacherId);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, new RolesGuard(['DIRECTOR']))
  @Delete('teachers/:teacherId/class')
  removeTeacher(@Param('teacherId', ParseIntPipe) teacherId: number) {
    return this.classService.removeTeacherFromClass(teacherId);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, new RolesGuard(['DIRECTOR']))
  @Patch('teachers/:teacherId/class')
  updateTeacherClass(
    @Param('teacherId', ParseIntPipe) teacherId: number,
    @Body('classId', ParseIntPipe) classId: number,
  ) {
    return this.classService.updateTeacherClass(classId, teacherId);
  }

  @Get('/teacher/:ClassId')
  @UseGuards(AuthGuard, new RolesGuard(['TEACHER']))
  @ApiBearerAuth()
  getMyClasses(@Param('ClassId', ParseIntPipe) ClassId: number, @Req() req) {
    return this.classService.getTeacherClassById(ClassId, req);
  }
}
