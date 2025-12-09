module.exports = (sequelize, DataTypes) => {
  const Emprestimo = sequelize.define('Emprestimo', {
    data_retirada: { type: DataTypes.DATEONLY, allowNull: false },
    data_devolucao_prevista: { type: DataTypes.DATEONLY, allowNull: false },
    data_devolucao_real: { type: DataTypes.DATEONLY, allowNull: true },
    dias_atraso: { type: DataTypes.INTEGER, defaultValue: 0 },
    valor_multa: { type: DataTypes.DECIMAL(10,2), defaultValue: 0.00 },
    status: { type: DataTypes.ENUM('ativo','devolvido','atrasado'), defaultValue: 'ativo' }
  });
  return Emprestimo;
};
