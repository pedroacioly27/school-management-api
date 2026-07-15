import { GradeLevel } from 'src/common/enums/grade-level.enum';
import { Section } from 'src/common/enums/section.enum';
import { StudentProfile } from 'src/users/entities/student-profile.entity';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity('classes')
@Unique(['gradeLevel', 'section'])
export class SchoolClass {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: GradeLevel })
  gradeLevel: GradeLevel;

  @Column({ type: 'enum', enum: Section })
  section: Section;

  @OneToMany(() => StudentProfile, (student) => student.class)
  student: StudentProfile;
}
