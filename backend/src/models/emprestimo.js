module.exports = (sequelize, DataTypes) => {
  const Emprestimo = sequelize.define("Emprestimo", {
    dataEmprestimo: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW,
    },
    dataPrevista: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    dataDevolucao: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "pendente", // pendente | devolvido | atrasado
    },
    multa: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
  });

  Emprestimo.associate = (models) => {
    Emprestimo.belongsTo(models.Livro, { foreignKey: "livroId" });
    Emprestimo.belongsTo(models.Membro, { foreignKey: "membroId" });
    Emprestimo.belongsTo(models.Funcionario, { foreignKey: "funcionarioId" });
  };

  return Emprestimo;
};
