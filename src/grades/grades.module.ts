import { Module } from '@nestjs/common';
import { GradesService } from './grades.service';
import { GradesController } from './grades.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Grade } from './entities/grade.entity';
import { TeacherProfile } from 'src/users/entities/teacher-profile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Grade, TeacherProfile])],
  providers: [GradesService],
  controllers: [GradesController],
})
export class GradesModule {}
