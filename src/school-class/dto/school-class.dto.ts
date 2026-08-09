import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { GradeLevel } from 'src/common/enums/grade-level.enum';
import { Section } from 'src/common/enums/section.enum';

export class CreateSchoolClassDto {
  @ApiProperty({
    enum: GradeLevel,
    example: GradeLevel.FOURTH,
  })
  @IsEnum(GradeLevel)
  gradeLevel: GradeLevel;

  @ApiProperty({
    enum: Section,
    example: Section.B,
  })
  @IsEnum(Section)
  section: Section;
}
