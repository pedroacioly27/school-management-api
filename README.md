# 🎓 Smart School API

API REST para gerenciamento escolar desenvolvida utilizando **NestJS**, com autenticação via JWT, controle de acesso por perfil de usuário e gerenciamento de alunos, professores, turmas e notas.

O projeto foi desenvolvido com foco em aplicar conceitos utilizados no desenvolvimento backend profissional, como arquitetura modular, validações, autenticação segura e relacionamento entre entidades utilizando banco de dados relacional.

---

# 🚀 Tecnologias utilizadas

## Backend

* Node.js
* NestJS
* TypeScript
* TypeORM
* PostgreSQL
* JWT (JSON Web Token)
* Bcrypt
* Class Validator
* Class Transformer

## Ferramentas

* GitHub
* Insomnia

---

# 📚 Sobre o projeto

O **Smart School API** é um sistema backend para gerenciamento de uma instituição de ensino.

A aplicação permite controlar usuários com diferentes níveis de acesso, organizar turmas escolares e realizar o gerenciamento de notas dos alunos.

O sistema utiliza autenticação baseada em JWT e autorização através de Roles, garantindo que cada usuário tenha acesso apenas às funcionalidades permitidas.

---

# 🔐 Controle de usuários e permissões

O sistema possui três tipos de usuários:

## 👨‍💼 Diretor

Responsável pelo gerenciamento administrativo.

Possui permissões para:

* Criar professores
* Gerenciar alunos
* Criar turmas
* Administrar informações acadêmicas

---

## 👨‍🏫 Professor

Responsável pelo acompanhamento dos alunos.

Possui permissões para:

* Registrar notas
* Consultar informações das turmas
* Gerenciar avaliações dos alunos

---

## 👨‍🎓 Aluno

Usuário responsável por acompanhar seu desempenho acadêmico.

Possui permissões para:

* Consultar seu perfil
* Visualizar suas notas

---

# 🏗️ Arquitetura do projeto

O projeto segue a arquitetura modular proposta pelo NestJS.

Estrutura principal:

```
src
│
├── auth
│   ├── guards
│   └── services
│
├── users
│   ├── controllers
│   ├── services
│   ├── dto
│   └── entities
│
├── grades
│   ├── controllers
│   ├── services
│   ├── dto
│   └── entities
│
├── school-class
│   ├── controllers
│   ├── services
│   ├── dto
│   └── entities
│
└── common
    └── enums
```

---

# 🗄️ Principais entidades

## User

Responsável pela autenticação dos usuários.

Principais informações:

* Nome
* Email
* Senha criptografada
* Role

Relacionamentos:

* Possui um StudentProfile ou TeacherProfile

---

## StudentProfile

Representa o perfil acadêmico do aluno.

Relacionamentos:

* Pertence a um usuário
* Possui notas
* Pode estar vinculado a uma turma

---

## TeacherProfile

Representa o perfil do professor.

Relacionamentos:

* Pertence a um usuário
* Possui uma disciplina
* Pode estar vinculado a turmas
* Responsável pelo lançamento de notas

---

## Grade

Representa as notas dos alunos.

Relacionamentos:

* Pertence a um aluno
* Criada por um professor
* Possui uma disciplina

---

## SchoolClass

Representa uma turma escolar.

Relacionamentos:

* Possui alunos
* Possui professores

---

# 🔑 Autenticação

A autenticação utiliza JWT.

Fluxo:

1. Usuário realiza login informando email e senha
2. A API valida as credenciais
3. A senha é comparada utilizando bcrypt
4. Um token JWT é gerado
5. O token permite acesso às rotas protegidas

Exemplo de utilização:

```
Authorization: Bearer TOKEN
```

---

# 🛡️ Segurança

Foram implementadas algumas práticas de segurança:

* Senhas armazenadas utilizando hash com bcrypt
* Autenticação utilizando JWT
* Proteção de rotas através de Guards
* Controle de permissões utilizando Roles
* Validação de dados recebidos através de DTOs

---

# 📌 Funcionalidades implementadas

## Usuários

✔ Cadastro de usuários
✔ Login
✔ Criptografia de senha
✔ Controle de acesso por perfil

---

## Professores

✔ Criação de professores
✔ Associação com disciplina
✔ Perfil específico de professor

---

## Alunos

✔ Cadastro de alunos
✔ Perfil específico de aluno
✔ Associação com turma
✔ Consulta de notas

---

## Notas

✔ Cadastro de notas
✔ Associação entre aluno e professor
✔ Controle por disciplina

---

## Turmas

✔ Criação de turmas
✔ Adicionar alunos
✔ Adicionar professores
✔ Gerenciamento dos vínculos

---

# ⚙️ Como executar o projeto

## Pré-requisitos

Antes de iniciar, tenha instalado:

* Node.js
* PostgreSQL
* Git

---

## Clone o repositório

```bash
git clone https://github.com/pedroacioly27/school-management-api.git
```

Entre na pasta:

```bash
cd school-management-api
```

Instale as dependências:

```bash
npm install
```

---

# 🔧 Configuração do ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=sua_senha
DATABASE_NAME=smart_school

JWT_SECRET=sua_secret_key
JWT_EXPIRATION_TIME=1d
```

---

# 🗃️ Banco de dados

Crie o banco PostgreSQL:

```sql
CREATE DATABASE smart_school;
```

Após configurar o ambiente, execute:

```bash
npm run start:dev
```

A aplicação estará disponível em:

```
http://localhost:3000
```

---

# 📂 Próximas melhorias

Algumas funcionalidades planejadas:

* [ ] Implementação de Swagger para documentação da API
* [ ] Criação de Seeds para ambiente de demonstração
* [ ] Testes unitários
* [ ] Dockerização da aplicação
* [ ] Deploy em ambiente cloud
* [ ] Dashboard administrativo

---

# 🎯 Objetivo do projeto

Este projeto foi desenvolvido para aplicar na prática conhecimentos de desenvolvimento backend utilizando NestJS, explorando:

* Construção de APIs REST
* Autenticação e autorização
* Arquitetura modular
* ORM e banco de dados relacional
* Boas práticas de organização de código

---

# 👨‍💻 Autor

**Pedro Acioly**

Backend Developer | Node.js | TypeScript

GitHub:

https://github.com/pedroacioly27
