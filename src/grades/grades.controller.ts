import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { GradesService } from './grades.service';
import { CreateGradeDto } from './dto/create-grade.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/auth.roles.guard';
import { FilterGradeDto } from './dto/filter-grade.dto';
import { UpdateGradeDto } from './dto/update-grade.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Bimester } from 'src/common/enums/term.enum';

@ApiTags('Grades')
@ApiBearerAuth('access-token')
@Controller('grades')
export class GradesController {
  constructor(private readonly gradeService: GradesService) {}

  @UseGuards(AuthGuard, new RolesGuard(['TEACHER']))
  @ApiOperation({
    summary: 'Create a new grade (Teacher only)',
  })
  @Post()
  create(@Body() dto: CreateGradeDto, @Req() req) {
    return this.gradeService.create(dto, req);
  }

  @UseGuards(AuthGuard, new RolesGuard(['TEACHER', 'DIRECTOR']))
  @ApiOperation({
    summary: 'Get grades with filters (Teacher & Director)',
  })
  @ApiQuery({ name: 'studentId', required: false, example: 1 })
  @ApiQuery({ name: 'classId', required: false, example: 1 })
  @ApiQuery({ name: 'bimester', required: false, enum: Bimester })
  @Get()
  findall(@Query() filters: FilterGradeDto, @Req() req) {
    return this.gradeService.findall(filters, req);
  }

  @UseGuards(AuthGuard, new RolesGuard(['TEACHER']))
  @ApiOperation({
    summary: 'Update a grade (Teacher only)',
  })
  @ApiParam({ name: 'id', example: 1 })
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateGradeDto,
    @Req() req,
  ) {
    return this.gradeService.update(id, data, req);
  }

  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Get student report card',
  })
  @ApiParam({ name: 'studentId', example: 1 })
  @Get('/students/:studentId/report-card')
  getBoletim(
    @Param('studentId', ParseIntPipe) studentId: number,
    @Req()
    req,
  ) {
    return this.gradeService.getReportCard(studentId, req);
  }
}
