import { PartialType } from '@nestjs/mapped-types';
import { CreateSchoolClassDto } from './school-class.dto';

export class UpdateSchoolClassDto extends PartialType(CreateSchoolClassDto) {}
