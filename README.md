BiblioTech - Scaffold
========================

Conteúdo:
- backend/ : Node.js + Express + Sequelize (SQLite) skeleton
- frontend/: Vue 3 (Vite) skeleton

Como usar (rápido)
------------------
1. Backend
   cd backend
   cp .env.example .env
   # ajuste JWT_SECRET se desejar
   npm install
   npm start
   # server em http://localhost:4000; um admin será semeado automaticamente:
   # admin@bibliotech.com / Admin@123

2. Frontend
   cd frontend
   npm install
   npm run dev
   # abra http://localhost:5173 (ou porta mostrada pelo Vite)

Observações
----------
- O backend usa sequelize.sync() para criar as tabelas automaticamente.
- Este scaffold contém apenas endpoints mínimos (auth + health). Complete os controllers e rotas conforme o plano de requisitos.
- Para produção, substitua explictamente o uso de sync() por migrations, e proteja variáveis de ambiente.

Próximos passos que eu posso executar agora (escolha uma opção):
1) Gerar endpoints CRUD para livros, membros e empréstimos (backend) — eu gero o código e adiciono ao scaffold.
2) Gerar frontend completo (listagens, forms, fluxo de empréstimo/devolução).
3) Adicionar job agendado para marcar atrasados e calcular multas.
4) Gerar collection Postman com exemplos de chamadas.

Diga qual opção (1–4) você quer que eu gere agora que eu já tenho o scaffold pronto.


[UPDATE] Endpoints CRUD for livros, membros and emprestimos added to backend. Use admin to create records or call endpoints as admin.
