const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Emprestimo = sequelize.define("Emprestimo", {
    data_emprestimo: DataTypes.DATE,
    data_devolucao_prevista: DataTypes.DATE,
    data_devolucao_real: DataTypes.DATE,
    status: DataTypes.STRING,
    dias_atraso: DataTypes.INTEGER,
    valor_multa: DataTypes.FLOAT
});

module.exports = Emprestimo;
