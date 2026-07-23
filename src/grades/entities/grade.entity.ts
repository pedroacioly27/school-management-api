import { GradeType } from 'src/common/enums/grade-type.enum';
import { Subject } from 'src/common/enums/subject.enum';
import { Bimester } from 'src/common/enums/term.enum';
import { SchoolClass } from 'src/school-class/entities/school-class.entity';
import { StudentProfile } from 'src/users/entities/student-profile.entity';
import { TeacherProfile } from 'src/users/entities/teacher-profile.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Grade {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal', precision: 4, scale: 2 })
  value: number;

  @Column({ type: 'enum', enum: Subject })
  subject: Subject;

  @ManyToOne(() => SchoolClass, (schoolClass) => schoolClass.grades)
  schoolClass: SchoolClass;

  @Column({ type: 'enum', enum: Bimester })
  bimester: Bimester;

  @Column({ type: 'enum', enum: GradeType })
  gradeType: GradeType;

  @ManyToOne(() => StudentProfile, (studentProfile) => studentProfile.grades)
  student: StudentProfile;

  @ManyToOne(() => TeacherProfile, (teacherProfile) => teacherProfile.grades)
  teacher: TeacherProfile;
}
