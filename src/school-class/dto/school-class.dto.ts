import { IsEnum } from 'class-validator';
import { GradeLevel } from 'src/common/enums/grade-level.enum';
import { Section } from 'src/common/enums/section.enum';

export class CreateSchoolClassDto {
  @IsEnum(GradeLevel)
  gradeLevel: GradeLevel;

  @IsEnum(Section)
  section: Section;
}
