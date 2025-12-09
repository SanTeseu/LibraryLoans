// src/app.js

const express = require('express');
const cors = require('cors');
const morgan = require('morgan'); // Para logs de requisição
const routes = require('./routes'); // Router principal (deve importar authRoutes, livrosRoutes, etc.)

// Importa os modelos e o objeto Sequelize
const { sequelize, Funcionario } = require('./models');
const bcrypt = require('bcrypt'); // Para o hash da senha

const app = express();

// --- Middlewares ---
app.use(cors({ origin: 'http://localhost:5173' })); // Permite a comunicação com o frontend
app.use(morgan('dev')); // Logger de requisições
app.use(express.json()); // Body parser para JSON

// --- Rotas ---
// Anexa o router principal em /api. Este router deve conter /api/auth, /api/livros, etc.
app.use('/api', routes);

// --- Inicialização do Banco de Dados e Seed (Manter aqui temporariamente) ---
async function init() {
  try {
    // Sincroniza o DB: Cria tabelas se não existirem
    await sequelize.sync(); 

    // Seed do Admin (RF02)
    const admin = await Funcionario.findOne({ where: { email: 'admin@bibliotech.com' }});
    if(!admin) {
      const senha_hash = await bcrypt.hash('Admin@123', 10);
      await Funcionario.create({ nome:'Admin', email:'admin@bibliotech.com', senha_hash, perfil:'admin' });
      console.log('✅ Admin seeded: admin@bibliotech.com / Admin@123');
    }
  } catch (error) {
    console.error('❌ Erro durante a sincronização ou seeding:', error);
    // Em produção, isso deve ser fatal
  }
}

// Executa a inicialização
init();

module.exports = app;