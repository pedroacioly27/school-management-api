import {
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { SchoolClass } from 'src/school-class/entities/school-class.entity';
import { Grade } from 'src/grades/entities/grade.entity';

@Entity('student_profiles')
export class StudentProfile {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, (user) => user.studentProfile)
  @JoinColumn()
  user: User;

  @ManyToOne(() => SchoolClass, (cls) => cls.students, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  schoolClass: SchoolClass | null;

  @OneToMany(() => Grade, (grade) => grade.student)
  grades: Grade[];
}
