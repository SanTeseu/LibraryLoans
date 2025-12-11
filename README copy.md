🌟 BiblioTech – Library&Loans

Sistema completo de gerenciamento de bibliotecas, com autenticação, controle de acervo, membros, funcionários e fluxo de empréstimos com cálculo automático de atraso e multas.

- Sumário

- Sobre o Projeto

- Arquitetura

- Como Rodar

Backend

Frontend

- Variáveis de Ambiente

- Migrations & Seeds

- Principais Endpoints

- Dados de Demonstração (Seeds)

- Roteiro de Apresentação

- Solução de Problemas

- Melhorias Futuras

- Sobre o Projeto

BiblioTech – Library&Loans é uma aplicação completa para gerenciamento de uma biblioteca moderna.

Inclui:

✔ Controle de funcionários (Admin + Bibliotecários)

✔ Controle de membros com status (ativo, suspenso, inativo)

✔ Acervo de livros com disponibilidade

✔ Empréstimos com datas previstas, devolução, atraso e multa

✔ Suspensão automática de membros

✔ Autenticação JWT com proteção de rotas

✔ Integração completa entre backend + frontend

Ideal para estudo, aulas, apresentação ou como base de um sistema real.

- Arquitetura
/bibliotech
  ├── backend/   → API REST (Node.js, Express, Sequelize, SQLite)
  └── frontend/  → SPA (Vue 3, Vite, Pinia, Axios)


Backend: MVC organizado (models, controllers, routes)

Frontend: componentes Vue modulares + serviço central de API

Banco: SQLite local (simples e perfeito para demos)

Seeds: Dados reais para demonstrar funcionamento

- Como Rodar
Backend
- cd C:\Users\Matheus\Desktop\bibliotech\backend
- npm install express sequelize sqlite3 sequelize-cli bcryptjs cors jsonwebtoken dotenv
- npm install --save-dev nodemon


Criar banco + tabelas

Caso necessário banco renovado para apresentação:

- rm src/database.sqlite  
- delete manualmente

npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all

- Iniciar
npm start


Servidor: http://localhost:4000

Frontend
cd C:\Users\Matheus\Desktop\bibliotech\frontend
- npm install vue vue-router
- npm install --save-dev vite @vitejs/plugin-vue

npm run dev


Acesse: http://localhost:5173

- Variáveis de Ambiente

Arquivo: /backend/.env

# sequelize para SQLite
DATABASE_URL=sqlite:./database/bibliotech.sqlite
JWT_SECRET=supersecreto123
PORT=4000
NODE_ENV=development
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=library
DB_PORT=3306


- Migrations & Seeds
Criar tabelas:
npx sequelize-cli db:migrate

Inserir dados de exemplo:
npx sequelize-cli db:seed:all

Reset completo:
delete manual db
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all

- Principais Endpoints
Auth
(Método)	{Rota}	[Descrição]
(POST)	{/api/auth/login}	[Login e emissão de token]

GET	/api/auth/me	Dados do usuário logado
Funcionários
Método	Rota
GET	/api/funcionarios
POST	/api/funcionarios
PUT	/api/funcionarios/:id
DELETE	/api/funcionarios/:id
Membros
Método	Rota
GET	/api/membros
POST	/api/membros
PATCH	/api/membros/:id/status
Livros
Método	Rota
GET	/api/livros
POST	/api/livros
PUT	/api/livros/:id
Empréstimos
Método	Rota
POST	/api/emprestimos
POST	/api/emprestimos/:id/devolver
GET	/api/emprestimos

- Dados de Demonstração (Seeds)
Funcionários
Nome	Email	Senha	Cargo
Admin	admin@bibliotech.com
	Admin@123	admin
Bibliotecário	biblio@bibliotech.com
	Biblio@123	bibliotecario
Membros

Ana Costa – CPF: 111.222.333-44 – ativo

Carlos Lima – CPF: 222.333.444-55 – ativo

Julia Rocha – CPF: 333.444.555-66 – suspenso

Livros
Título	Autor	Categoria	Exemplares
1984	George Orwell	Ficção	5
Clean Code	Robert C. Martin	Técnico	3
O Senhor dos Anéis	J.R.R. Tolkien	Fantasia	4
Sapiens	Yuval Noah Harari	História	2

- Roteiro de Apresentação (Perfeito para banca)

Login como admin

Mostrar dashboard / listagens

Criar membro

Criar livro

Realizar empréstimo

Devolver mostrando cálculo de multa

Suspensão automática do membro

Mostrar filtro de atrasados

Finalizar com arquitetura e código organizado

Tempo estimado: 2–4 minutos.

- Solução de Problemas
- Erro: no such table: Membros

→ Migrations não foram executadas

npx sequelize-cli db:migrate

❌ Erro no login:

 npx sequelize-cli db:migrate:undo:all
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all


→ Backend não está rodando
→ Verifique http://localhost:4000

❌ Import errado em Vue

→ Ajustar caminho:

import api from "../../services/api";
