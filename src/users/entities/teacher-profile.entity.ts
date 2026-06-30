import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('teacher_profiles')
export class TeacherProfile {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, (user)=>user.teacherProfile)
  @JoinColumn()
  user: User;
}
