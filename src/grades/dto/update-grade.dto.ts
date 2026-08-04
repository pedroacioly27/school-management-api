import { IsEnum, IsNumber, IsOptional, Max, Min } from 'class-validator';
import { GradeType } from 'src/common/enums/grade-type.enum';

export class UpdateGradeDto {
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(10)
  value?: number;

  @IsOptional()
  @IsEnum(GradeType)
  gradeType?: GradeType;
}
