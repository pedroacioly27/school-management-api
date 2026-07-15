import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { GradesService } from './grades.service';
import { CreateGradeDto } from './dto/create-grade.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/auth.roles.guard';

@Controller('grades')
export class GradesController {
  constructor(private readonly gradeService: GradesService) {}

  @UseGuards(AuthGuard, new RolesGuard(['TEACHER']))
  @Post()
  create(@Body() dto: CreateGradeDto, @Req() req) {
    return this.gradeService.create(dto, req);
  }

  @Post()
  testSchool() {}
}
