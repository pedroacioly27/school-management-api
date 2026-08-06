import { Grade } from 'src/grades/entities/grade.entity';
import { SchoolClass } from 'src/school-class/entities/school-class.entity';
import { StudentProfile } from 'src/users/entities/student-profile.entity';
import { TeacherProfile } from 'src/users/entities/teacher-profile.entity';
import { User } from 'src/users/entities/user.entity';
import { DataSource } from 'typeorm';
import 'dotenv/config';

export const AppDataSource = new DataSource({
  type: 'postgres',

  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,

  entities: [User, StudentProfile, TeacherProfile, Grade, SchoolClass],

  synchronize: false,
});
