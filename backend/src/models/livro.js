module.exports = (sequelize, DataTypes) => {
  const Livro = sequelize.define("Livro", {
    titulo: DataTypes.STRING,
    autor: DataTypes.STRING,
    isbn: { type: DataTypes.STRING, unique: true },
    categoria: DataTypes.STRING,
    quantidadeTotal: DataTypes.INTEGER,
    quantidadeDisponivel: DataTypes.INTEGER
  });

  Livro.associate = (models) => {
    Livro.hasMany(models.Emprestimo, { foreignKey: "livroId" });
  };

  return Livro;
};
