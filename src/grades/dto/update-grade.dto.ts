import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, Max, Min } from 'class-validator';
import { GradeType } from 'src/common/enums/grade-type.enum';

export class UpdateGradeDto {
  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(10)
  value?: number;

  @ApiPropertyOptional({ enum: GradeType, example: GradeType.MONTHLY })
  @IsOptional()
  @IsEnum(GradeType)
  gradeType?: GradeType;
}
