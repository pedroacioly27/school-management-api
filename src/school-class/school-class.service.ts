import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SchoolClass } from './entities/school-class.entity';
import { Repository } from 'typeorm';
import { CreateSchoolClassDto } from './dto/school-class.dto';

@Injectable()
export class SchoolClassService {
  constructor(
    @InjectRepository(SchoolClass)
    private readonly schoolClassRepository: Repository<SchoolClass>,
  ) {}

  async create(data: CreateSchoolClassDto) {
    const classExists = await this.schoolClassRepository.findOne({
      where: {
        gradeLevel: data.gradeLevel,
        section: data.section,
      },
    });

    if (classExists) {
      throw new BadRequestException('Class already exists');
    }

    const newClass = this.schoolClassRepository.create(data);

    await this.schoolClassRepository.save(newClass);

    return newClass;
  }

  async findAll() {
    return this.schoolClassRepository.find({
      relations: { students: true, teachers: true },
    });
  }

  async findOne(id: number) {
    return this.schoolClassRepository.findOne({
      where: { id },
      relations: {
        students: true,
        teachers: true,
      },
    });
  }
}
