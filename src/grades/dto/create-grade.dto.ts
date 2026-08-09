import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, Max, Min } from 'class-validator';
import { GradeType } from 'src/common/enums/grade-type.enum';
import { Bimester } from 'src/common/enums/term.enum';

export class CreateGradeDto {
  @ApiProperty({
    example: 5,
  })
  @IsNumber()
  @Min(0)
  @Max(10)
  value: number;

  @ApiProperty({
    enum: Bimester,
    example: Bimester.SECOND,
  })
  @IsEnum(Bimester)
  bimester: Bimester;

  @ApiProperty({
    enum: GradeType,
    example: GradeType.BIMESTER,
  })
  @IsEnum(GradeType)
  gradeType: GradeType;

  @ApiProperty({
    example: 3,
  })
  @IsNumber()
  studentId: number;
}
