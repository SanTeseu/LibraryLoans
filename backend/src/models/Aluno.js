const Aluno = sequelize.define("Aluno", {
  nome: DataTypes.STRING,
  email: DataTypes.STRING,

  suspenso: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },

  suspenso_ate: {
    type: DataTypes.DATE,
    allowNull: true
  }
});
