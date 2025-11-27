const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Livro = sequelize.define("Livro", {
    titulo: DataTypes.STRING,
    autor: DataTypes.STRING,
    isbn: { type: DataTypes.STRING, unique: true },
    categoria: DataTypes.STRING,
    exemplares_total: DataTypes.INTEGER,
    ativo: DataTypes.BOOLEAN
});

module.exports = Livro;
