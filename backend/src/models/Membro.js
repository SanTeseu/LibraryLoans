const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Membro = sequelize.define("Membro", {
    nome: DataTypes.STRING,
    cpf: { type: DataTypes.STRING, unique: true },
    telefone: DataTypes.STRING,
    email: { type: DataTypes.STRING, unique: true },
    status: DataTypes.STRING
});

module.exports = Membro;
