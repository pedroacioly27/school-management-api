import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SchoolClass } from './entities/school-class.entity';
import { SchoolClassController } from './school-class.controller';
import { SchoolClassService } from './school-class.service';
import { TeacherProfile } from 'src/users/entities/teacher-profile.entity';
import { StudentProfile } from 'src/users/entities/student-profile.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([SchoolClass, TeacherProfile, StudentProfile]),
  ],
  exports: [TypeOrmModule],
  controllers: [SchoolClassController],
  providers: [SchoolClassService],
})
export class SchoolClassModule {}
