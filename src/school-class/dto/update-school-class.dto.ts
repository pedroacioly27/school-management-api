import { PartialType } from '@nestjs/swagger';
import { CreateSchoolClassDto } from './school-class.dto';

export class UpdateSchoolClassDto extends PartialType(CreateSchoolClassDto) {}
