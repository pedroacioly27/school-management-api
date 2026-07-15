import { IsEmail, IsEnum, IsString, MinLength } from 'class-validator';
import { Subject } from 'src/common/enums/subject.enum';

export class CreateTeacherDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsEnum(Subject)
  subject: Subject;
}
