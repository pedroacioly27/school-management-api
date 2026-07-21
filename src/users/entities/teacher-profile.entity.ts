import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Subject } from 'src/common/enums/subject.enum';
import { SchoolClass } from 'src/school-class/entities/school-class.entity';

@Entity('teacher_profiles')
export class TeacherProfile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: Subject,
  })
  subject: Subject;

  @OneToOne(() => User, (user) => user.teacherProfile)
  @JoinColumn()
  user: User;

  @ManyToOne(() => SchoolClass, (cls) => cls.teachers, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  schoolClass: SchoolClass;
}
