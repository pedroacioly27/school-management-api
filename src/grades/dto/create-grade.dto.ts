import { IsNumber } from 'class-validator';

export class CreateGradeDto {
  @IsNumber()
  value: number;

  @IsNumber()
  studentId: number;
}
