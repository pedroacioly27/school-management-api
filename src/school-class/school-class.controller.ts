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
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Classes')
@ApiBearerAuth('access-token')
@Controller('classes')
export class SchoolClassController {
  constructor(private readonly classService: SchoolClassService) {}

  @UseGuards(AuthGuard, new RolesGuard(['DIRECTOR']))
  @ApiOperation({ summary: 'Create a class (Director only)' })
  @Post()
  create(@Body() data: CreateSchoolClassDto) {
    return this.classService.create(data);
  }

  @UseGuards(AuthGuard, new RolesGuard(['DIRECTOR']))
  @ApiOperation({ summary: 'Get all classes (Director only)' })
  @Get()
  findAll() {
    return this.classService.findAll();
  }

  @UseGuards(AuthGuard, new RolesGuard(['DIRECTOR']))
  @ApiOperation({ summary: 'Get class by ID (Director only)' })
  @ApiParam({ name: 'id', example: 1 })
  @Get(':ClassId')
  findOne(@Param('ClassId', ParseIntPipe) ClassId: number) {
    return this.classService.findOne(ClassId);
  }

  @UseGuards(AuthGuard, new RolesGuard(['DIRECTOR']))
  @ApiOperation({ summary: 'Update class (Director only)' })
  @ApiParam({ name: 'id', example: 1 })
  @Patch(':ClassId')
  update(
    @Param('ClassId', ParseIntPipe) ClassId: number,
    @Body() data: UpdateSchoolClassDto,
  ) {
    return this.classService.update(ClassId, data);
  }

  @UseGuards(AuthGuard, new RolesGuard(['DIRECTOR']))
  @ApiOperation({ summary: 'Delete class (Director only)' })
  @ApiParam({ name: 'id', example: 1 })
  @Delete(':ClassId')
  delete(@Param('ClassId', ParseIntPipe) ClassId: number) {
    return this.classService.delete(ClassId);
  }

  @UseGuards(AuthGuard, new RolesGuard(['DIRECTOR']))
  @ApiOperation({ summary: 'Delete class (Director only)' })
  @ApiParam({ name: 'classId', example: 1 })
  @Post(':classId/students')
  addStudent(
    @Param('classId', ParseIntPipe) classId: number,
    @Body('studentId', ParseIntPipe) studentId: number,
  ) {
    return this.classService.addStudent(classId, studentId);
  }

  @UseGuards(AuthGuard, new RolesGuard(['DIRECTOR']))
  @ApiOperation({ summary: 'Remove student from class (Director only)' })
  @ApiParam({ name: 'studentId', example: 5 })
  @Delete('students/:studentId/class')
  removeStudent(@Param('studentId', ParseIntPipe) studentId: number) {
    return this.classService.removeStudentFromClass(studentId);
  }

  @UseGuards(AuthGuard, new RolesGuard(['DIRECTOR']))
  @ApiOperation({ summary: 'Update student class (Director only)' })
  @ApiParam({ name: 'studentId', example: 5 })
  @Patch('students/:studentId/class')
  updateStudentClass(
    @Param('studentId', ParseIntPipe) studentId: number,
    @Body('classId', ParseIntPipe) classId: number,
  ) {
    return this.classService.updateStudentClass(classId, studentId);
  }

  @UseGuards(AuthGuard, new RolesGuard(['DIRECTOR']))
  @ApiOperation({ summary: 'Add teacher to class (Director only)' })
  @ApiParam({ name: 'classId', example: 1 })
  @Post(':classId/teachers')
  addTeacher(
    @Param('classId', ParseIntPipe) classId: number,
    @Body('teacherId', ParseIntPipe) teacherId: number,
  ) {
    return this.classService.addTeacher(classId, teacherId);
  }

  @UseGuards(AuthGuard, new RolesGuard(['DIRECTOR']))
  @ApiOperation({ summary: 'Remove teacher from class (Director only)' })
  @ApiParam({ name: 'teacherId', example: 3 })
  @Delete('teachers/:teacherId/class')
  removeTeacher(@Param('teacherId', ParseIntPipe) teacherId: number) {
    return this.classService.removeTeacherFromClass(teacherId);
  }

  @UseGuards(AuthGuard, new RolesGuard(['DIRECTOR']))
  @ApiOperation({ summary: 'Update teacher class (Director only)' })
  @ApiParam({ name: 'teacherId', example: 3 })
  @Patch('teachers/:teacherId/class')
  updateTeacherClass(
    @Param('teacherId', ParseIntPipe) teacherId: number,
    @Body('classId', ParseIntPipe) classId: number,
  ) {
    return this.classService.updateTeacherClass(classId, teacherId);
  }

  @Get('/teacher/:ClassId')
  @UseGuards(AuthGuard, new RolesGuard(['TEACHER']))
  @ApiOperation({ summary: 'Teacher retrieves their own class' })
  @ApiParam({ name: 'id', example: 1 })
  getMyClasses(@Param('ClassId', ParseIntPipe) ClassId: number, @Req() req) {
    return this.classService.getTeacherClassById(ClassId, req);
  }
}
