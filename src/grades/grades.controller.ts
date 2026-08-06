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
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('grades')
export class GradesController {
  constructor(private readonly gradeService: GradesService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard, new RolesGuard(['TEACHER']))
  @Post()
  create(@Body() dto: CreateGradeDto, @Req() req) {
    return this.gradeService.create(dto, req);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, new RolesGuard(['TEACHER', 'DIRECTOR']))
  @Get()
  findall(@Query() filters: FilterGradeDto, @Req() req) {
    return this.gradeService.findall(filters, req);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, new RolesGuard(['TEACHER']))
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateGradeDto,
    @Req() req,
  ) {
    return this.gradeService.update(id, data, req);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('/students/:studentId/report-card')
  getBoletim(
    @Param('studentId', ParseIntPipe) studentId: number,
    @Req()
    req,
  ) {
    return this.gradeService.getReportCard(studentId, req);
  }
}
