import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Subject } from 'src/common/enums/subject.enum';

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
}
