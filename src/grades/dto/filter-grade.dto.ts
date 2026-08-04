import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { Bimester } from 'src/common/enums/term.enum';

export class FilterGradeDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  studentId: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  classId: number;

  @IsOptional()
  @IsEnum(Bimester)
  bimester: Bimester;
}
