const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Funcionario = sequelize.define("Funcionario", {
    nome: DataTypes.STRING,
    email: { type: DataTypes.STRING, unique: true },
    senha_hash: DataTypes.STRING,
    perfil: DataTypes.STRING,
    status: DataTypes.BOOLEAN
});

module.exports = Funcionario;
