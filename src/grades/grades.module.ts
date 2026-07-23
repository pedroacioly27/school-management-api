import { Module } from '@nestjs/common';
import { GradesService } from './grades.service';
import { GradesController } from './grades.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Grade } from './entities/grade.entity';
import { TeacherProfile } from 'src/users/entities/teacher-profile.entity';
import { StudentProfile } from 'src/users/entities/student-profile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Grade, TeacherProfile, StudentProfile])],
  providers: [GradesService],
  controllers: [GradesController],
})
export class GradesModule {}
