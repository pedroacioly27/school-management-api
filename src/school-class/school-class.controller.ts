import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateSchoolClassDto } from './dto/school-class.dto';
import { SchoolClassService } from './school-class.service';
import { UpdateSchoolClassDto } from './dto/update-school-class.dto';

@Controller('classes')
export class SchoolClassController {
  constructor(private readonly classService: SchoolClassService) {}
  @Post()
  create(@Body() data: CreateSchoolClassDto) {
    return this.classService.create(data);
  }

  @Get()
  findAll() {
    return this.classService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.classService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateSchoolClassDto,
  ) {
    return this.classService.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.classService.delete(id);
  }

  @Post(':classId/students')
  addStudent(
    @Param('classId', ParseIntPipe) classId: number,
    @Body('studentId', ParseIntPipe) studentId: number,
  ) {
    return this.classService.addStudent(classId, studentId);
  }

  @Delete('students/:studentId/class')
  removeStudent(@Param('studentId', ParseIntPipe) studentId: number) {
    return this.classService.removeStudentFromClass(studentId);
  }

  @Patch('students/:studentId/class')
  updateStudentClass(
    @Param('studentId', ParseIntPipe) studentId: number,
    @Body('classId', ParseIntPipe) classId: number,
  ) {
    return this.classService.updateStudentClass(classId, studentId);
  }

  @Post(':classId/teachers')
  addTeacher(
    @Param('classId', ParseIntPipe) classId: number,
    @Body('teacherId', ParseIntPipe) teacherId: number,
  ) {
    return this.classService.addTeacher(classId, teacherId);
  }

  @Delete('teachers/:teacherId/class')
  removeTeacher(@Param('teacherId', ParseIntPipe) teacherId: number) {
    return this.classService.removeTeacherFromClass(teacherId);
  }

  @Patch('teachers/:teacherId/class')
  updateTeacherClass(
    @Param('teacherId', ParseIntPipe) teacherId: number,
    @Body('classId', ParseIntPipe) classId: number,
  ) {
    return this.classService.updateTeacherClass(classId, teacherId);
  }
}
