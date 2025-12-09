module.exports = (sequelize, DataTypes) => {
  const Membro = sequelize.define('Membro', {
    nome: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    cpf: { type: DataTypes.STRING, unique: true, allowNull: false },
    status: { type: DataTypes.ENUM('ativo','suspenso'), defaultValue: 'ativo' }
  });
  return Membro;
};
