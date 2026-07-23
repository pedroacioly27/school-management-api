import { IsEnum, IsNumber, Max, Min } from 'class-validator';
import { GradeType } from 'src/common/enums/grade-type.enum';
import { Bimester } from 'src/common/enums/term.enum';

export class CreateGradeDto {
  @IsNumber()
  @Min(0)
  @Max(10)
  value: number;

  @IsEnum(Bimester)
  bimester: Bimester;

  @IsEnum(GradeType)
  gradeType: GradeType;

  @IsNumber()
  studentId: number;
}
