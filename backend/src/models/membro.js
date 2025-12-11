module.exports = (sequelize, DataTypes) => {
  const Membro = sequelize.define("Membro", {
    nome: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cpf: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: true
    },
    telefone: {
      type: DataTypes.STRING,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM("ativo", "suspenso", "inativo"),
      defaultValue: "ativo"
    }
  });

  Membro.associate = (models) => {
    Membro.hasMany(models.Emprestimo, { foreignKey: "membroId" });
  };

  return Membro;
};
