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
  update(@Param('id', ParseIntPipe) id: number, data: UpdateSchoolClassDto) {
    return this.classService.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.classService.delete(id);
  }

  @Post(':classId/students/:studentId')
  addStudent(
    @Param('classId', ParseIntPipe) classId: number,
    @Param('studentId', ParseIntPipe) studentId: number,
  ) {
    return this.classService.addStudent(classId, studentId);
  }

  @Patch('students/:studentId/class')
  removeStudent(@Param('studentId', ParseIntPipe) studentId: number) {
    return this.classService.removeStudentFromClass(studentId);
  }

  @Patch(':classId/students/:studentId')
  updateStudentClass(
    @Param('classId', ParseIntPipe) classId: number,
    @Param('studentId', ParseIntPipe) studentId: number,
  ) {
    return this.classService.updateStudentClass(classId, studentId);
  }

  @Post(':classId/teachers/:teacherId')
  addTeacher(
    @Param('classId', ParseIntPipe) classId: number,
    @Param('teacherId', ParseIntPipe) teacherId: number,
  ) {
    return this.classService.addTeacher(classId, teacherId);
  }
}
