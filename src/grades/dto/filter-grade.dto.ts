import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { Bimester } from 'src/common/enums/term.enum';

export class FilterGradeDto {
  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  studentId: number;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  classId: number;

  @ApiPropertyOptional({ enum: Bimester, example: Bimester.FIRST })
  @IsOptional()
  @IsEnum(Bimester)
  bimester: Bimester;
}
