import { Role } from 'src/common/enums/role.enum';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TeacherProfile } from './teacher-profile.entity';
import { StudentProfile } from './student-profile.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: Role,
  })
  role: Role;

  @OneToOne(() => TeacherProfile, (profile) => profile.user)
  teacherProfile: TeacherProfile;

  @OneToOne(() => StudentProfile, (profile) => profile.user)
  studentProfile: StudentProfile;
}
