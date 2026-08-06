import { User } from 'src/users/entities/user.entity';
import { AppDataSource } from '../data-source';
import { StudentProfile } from 'src/users/entities/student-profile.entity';
import { TeacherProfile } from 'src/users/entities/teacher-profile.entity';
import { SchoolClass } from 'src/school-class/entities/school-class.entity';
import { Grade } from 'src/grades/entities/grade.entity';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/common/enums/role.enum';
import { Subject } from 'src/common/enums/subject.enum';
import { GradeLevel } from 'src/common/enums/grade-level.enum';
import { Section } from 'src/common/enums/section.enum';
import { Bimester } from 'src/common/enums/term.enum';
import { GradeType } from 'src/common/enums/grade-type.enum';

async function seed() {
  await AppDataSource.initialize();

  console.log('🌱 Banco conectado');

  await AppDataSource.synchronize(true);

  console.log('🧹 Banco limpo');

  const userRepository = AppDataSource.getRepository(User);

  const studentRepository = AppDataSource.getRepository(StudentProfile);

  const teacherRepository = AppDataSource.getRepository(TeacherProfile);

  const classRepository = AppDataSource.getRepository(SchoolClass);

  const gradeRepository = AppDataSource.getRepository(Grade);

  console.log('📦 Repositories carregados');

  const password = await bcrypt.hash('123456', 10);

  const director = userRepository.create({
    name: 'Carlos Diretor',
    email: 'diretor@smartschool.com',
    password,
    role: Role.DIRECTOR,
  });

  await userRepository.save(director);

  const teacher1 = userRepository.create({
    name: 'Ana Silva',
    email: 'ana@smartschool.com',
    password,
    role: Role.TEACHER,
  });

  const teacher2 = userRepository.create({
    name: 'Marcos Souza',
    email: 'marcos@smartschool.com',
    password,
    role: Role.TEACHER,
  });

  await userRepository.save([teacher1, teacher2]);

  const student1 = userRepository.create({
    name: 'João Pedro',
    email: 'joao@smartschool.com',
    password,
    role: Role.STUDENT,
  });

  const student2 = userRepository.create({
    name: 'Maria Oliveira',
    email: 'maria@smartschool.com',
    password,
    role: Role.STUDENT,
  });

  const student3 = userRepository.create({
    name: 'Lucas Santos',
    email: 'lucas@smartschool.com',
    password,
    role: Role.STUDENT,
  });

  const student4 = userRepository.create({
    name: 'Pedro Lima',
    email: 'pedro.lima@smartschool.com',
    password,
    role: Role.STUDENT,
  });

  await userRepository.save([student1, student2, student3, student4]);

  console.log('✅ Usuários criados');

  const teacherProfile1 = teacherRepository.create({
    user: teacher1,
    subject: Subject.MATH,
  });

  const teacherProfile2 = teacherRepository.create({
    user: teacher2,
    subject: Subject.SCIENCE,
  });

  await teacherRepository.save([teacherProfile1, teacherProfile2]);

  console.log('✅ TeacherProfiles criados');

  const studentProfile1 = studentRepository.create({
    user: student1,
  });

  const studentProfile2 = studentRepository.create({
    user: student2,
  });

  const studentProfile3 = studentRepository.create({
    user: student3,
  });

  const studentProfile4 = studentRepository.create({
    user: student4,
  });

  await studentRepository.save([
    studentProfile1,
    studentProfile2,
    studentProfile3,
    studentProfile4,
  ]);

  console.log('✅ StudentProfiles criados');

  const schoolClass = classRepository.create({
    gradeLevel: GradeLevel.EIGHTH,
    section: Section.A,

    students: [
      studentProfile1,
      studentProfile2,
      studentProfile3,
      studentProfile4,
    ],

    teachers: [teacherProfile1, teacherProfile2],
  });

  await classRepository.save(schoolClass);

  console.log('✅ Turma criada');

  const grades = [
    gradeRepository.create({
      subject: teacherProfile1.subject,
      student: studentProfile1,
      teacher: teacherProfile1,
      schoolClass,
      value: 8.5,
      bimester: Bimester.FIRST,
      gradeType: GradeType.BIMESTER,
    }),

    gradeRepository.create({
      subject: teacherProfile1.subject,
      student: studentProfile2,
      teacher: teacherProfile1,
      schoolClass,
      value: 7.8,
      bimester: Bimester.FIRST,
      gradeType: GradeType.BIMESTER,
    }),

    gradeRepository.create({
      subject: teacherProfile2.subject,
      student: studentProfile3,
      teacher: teacherProfile2,
      schoolClass,
      value: 9.2,
      bimester: Bimester.SECOND,
      gradeType: GradeType.BIMESTER,
    }),

    gradeRepository.create({
      subject: teacherProfile2.subject,
      student: studentProfile4,
      teacher: teacherProfile2,
      schoolClass,
      value: 6.9,
      bimester: Bimester.SECOND,
      gradeType: GradeType.BIMESTER,
    }),
  ];

  await gradeRepository.save(grades);

  console.log('✅ Notas criadas');
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
