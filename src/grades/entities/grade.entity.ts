import { Subject } from 'src/common/enums/subject.enum';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Grade {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal', precision: 4, scale: 2 })
  value: number;

  @Column({ type: 'enum', enum: Subject })
  subject: Subject;

  @ManyToOne(() => User, (user) => user.studentGrades)
  student: User;

  @ManyToOne(() => User, (user) => user.teacherGrades)
  teacher: User;
}
