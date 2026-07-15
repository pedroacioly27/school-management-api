import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SchoolClass } from './entities/school-class.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SchoolClass])],
  exports: [TypeOrmModule],
})
export class SchoolClassModule {}
