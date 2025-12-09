// src/models/index.js

const Sequelize = require('sequelize');
const config = require('../config/database'); // Seus dados de conexão (storage, dialect, etc.)

// 1. Cria a instância do Sequelize com a configuração
const sequelize = new Sequelize(config);

const db = {};

// 2. Carrega o modelo Funcionario, passando a instância 'sequelize' e 'DataTypes'
const FuncionarioModel = require('./Funcionario');
const Funcionario = FuncionarioModel(sequelize, Sequelize.DataTypes);

db[Funcionario.name] = Funcionario;

// Adicione aqui outros modelos (Livro, Membro, etc.) conforme você os cria

// 3. Associa modelos (necessário para relacionamentos, mesmo que vazio agora)
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize; // Instância de conexão
db.Sequelize = Sequelize; // Módulo Sequelize

module.exports = db;