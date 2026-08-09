import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsString, MinLength } from 'class-validator';
import { Subject } from 'src/common/enums/subject.enum';

export class CreateTeacherDto {
  @ApiProperty({ example: 'Maria' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'maria@email.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '123456' })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ enum: Subject, example: Subject.MATH })
  @IsEnum(Subject)
  subject: Subject;
}
