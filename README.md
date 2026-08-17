# Smart School API

API REST para gerenciamento escolar desenvolvida com **NestJS**, incluindo autenticação com JWT, controle de acesso por perfis (RBAC), documentação com Swagger e dados iniciais via Seed.

O projeto foi construído com foco em práticas reais de desenvolvimento backend profissional, como arquitetura modular, segurança, validações, relacionamento entre entidades e organização escalável de código.

---

# Tecnologias utilizadas

## Backend

- Node.js
- NestJS
- TypeScript
- TypeORM
- PostgreSQL

## Segurança & Validação

- JWT (JSON Web Token)
- Bcrypt
- Class Validator
- Class Transformer

## Documentação & Dados

- Swagger (OpenAPI)
- Seeds (dados iniciais)

## Ferramentas

- Git & GitHub
- Insomnia

---

# Sobre o projeto

O **Smart School API** é um sistema backend completo para gerenciamento de uma instituição de ensino.

A aplicação permite:

- Controle de usuários com diferentes permissões
- Gerenciamento de turmas
- Lançamento e consulta de notas
- Organização de alunos e professores

Toda a API é protegida por autenticação JWT e autorização baseada em roles, garantindo segurança e controle de acesso.

---

# Controle de usuários e permissões

O sistema possui três tipos de usuários:

## Diretor

Responsável pelo gerenciamento administrativo.

Permissões:

- Criar professores
- Gerenciar alunos
- Criar turmas
- Vincular alunos e professores
- Administrar informações acadêmicas

---

## Professor

Responsável pelo acompanhamento acadêmico.

Permissões:

- Registrar notas
- Consultar turmas
- Gerenciar avaliações dos alunos

---

## Aluno

Usuário final do sistema.

Permissões:

- Visualizar perfil
- Consultar suas notas

---

# Arquitetura do projeto

O projeto segue a arquitetura modular do NestJS:

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

# Principais entidades

## User

Responsável pela autenticação.

- Nome
- Email
- Senha criptografada
- Role

Relacionamentos:

- 1:1 com StudentProfile ou TeacherProfile

---

## StudentProfile

Perfil acadêmico do aluno.

- Vinculado a um usuário
- Possui notas
- Vinculado a uma turma

---

## TeacherProfile

Perfil do professor.

- Vinculado a um usuário
- Possui disciplina
- Pode estar em várias turmas
- Responsável pelas notas

---

## Grade

Notas dos alunos.

- Relacionada ao aluno
- Criada por professor
- Possui disciplina, tipo e bimestre

---

## SchoolClass

Turma escolar.

- Possui alunos
- Possui professores

---

# Autenticação

A autenticação é feita com JWT.

Fluxo:

1. Usuário faz login com email e senha  
2. Credenciais são validadas  
3. Senha comparada com bcrypt  
4. Token JWT é gerado  
5. Token permite acesso às rotas protegidas  

Exemplo:

```
Authorization: Bearer TOKEN
```

---

# Segurança

- Senhas com hash (bcrypt)
- Autenticação JWT
- Guards para proteção de rotas
- Controle de acesso por Roles
- Validação com DTOs

---

# Funcionalidades

## Usuários

✔ Cadastro  
✔ Login  
✔ Criptografia de senha  
✔ Controle de acesso  

---

## Professores

✔ Criação  
✔ Associação com disciplina  
✔ Perfil dedicado  

---

## Alunos

✔ Cadastro  
✔ Perfil acadêmico  
✔ Associação com turma  
✔ Consulta de notas  

---

## Notas

✔ Cadastro  
✔ Relação aluno/professor  
✔ Controle por disciplina, tipo e bimestre  

---

## Turmas

✔ Criação  
✔ Adição de alunos  
✔ Adição de professores  
✔ Gerenciamento completo  

---

# Documentação da API (Swagger)

A API possui documentação interativa com Swagger.

Após iniciar o projeto, acesse:

```
http://localhost:3000/api
```

Você poderá:

- Visualizar todas as rotas
- Testar endpoints diretamente
- Ver schemas e DTOs
- Autenticar com JWT

---

# Seed (Dados iniciais)

O projeto possui Seed para popular o banco com dados de teste.

Inclui:

- Usuários (Diretor, Professores e Alunos)
- Turmas
- Notas
- Disciplinas

Para executar:

```bash
npm run seed
```

---

# Como executar o projeto

## Pré-requisitos

- Node.js
- PostgreSQL
- Git

---

## Clone o repositório

```bash
git clone https://github.com/pedroacioly27/school-management-api.git
cd school-management-api
```

---

## Instale as dependências

```bash
npm install
```

---

# Configuração do ambiente

Crie um `.env`:

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

# Banco de dados

Crie o banco:

```sql
CREATE DATABASE smart_school;
```

---

## Rodar aplicação

```bash
npm run start:dev
```

Acesse:

```
http://localhost:3000
```

---

# Próximas melhorias

- [ ] Testes unitários
- [ ] Dockerização
- [ ] Deploy em cloud
- [ ] Dashboard administrativo
- [ ] Logs e monitoramento

---

# Objetivo do projeto

Projeto desenvolvido para portfólio com foco em vaga de **Desenvolvedor Backend Júnior**, aplicando:

- APIs REST com NestJS
- Autenticação e autorização
- Arquitetura modular
- Banco relacional com TypeORM
- Boas práticas de código

---

# Autor

**Pedro Acioly**

Backend Developer | Node.js | TypeScript

GitHub:  
https://github.com/pedroacioly27
