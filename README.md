# ioasys camp API
Desafio final do fase de imersão do ioasys camp 2022.

## ⚙️  Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- [Node.js](https://nodejs.org/en/)
- [Typescript](https://www.typescriptlang.org/)
- [Nest.js](https://nestjs.com/)
- [TypeORM](typeorm.io)
- [JWT](https://jwt.io/)

## 🚀 Uso

- Clone o repositório
- Inclua as variáveis de ambiente necessárias.
- Execute `yarn install` para instalar as dependências.
- Execute `yarn db:migrate` para criar ou atualizar as tabelas do banco de dados. O seed do BD será realizado na última migration.
- Rode o `yarn start` para iniciar a aplicação.

A aplicação estará disponível em `http://localhost:3000`

A documentação das rotas esterá disponível em `http://localhost:3000/docs`

### Variáveis de ambiente
As seguintes variáveis de ambiente são necessárias para a aplicação:
```
NODE_ENV
PORT
JWT_SECRET
EXPIRES_IN
DB_HOST
DB_PORT
DB_USER
DB_PASSWORD
DB_NAME
```

### Credenciais de acesso
As credenciais dos usuários de teste são:
 
* usuário padrão
  - username: `reno`
  - password: `Camp@123`
* usuário admin
  - username: `admin` 
  - password: `Camp@123`