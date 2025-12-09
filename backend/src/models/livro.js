module.exports = (sequelize, DataTypes) => {
  const Livro = sequelize.define('Livro', {
    titulo: { type: DataTypes.STRING, allowNull: false },
    autor: DataTypes.STRING,
    isbn: { type: DataTypes.STRING, unique: true },
    exemplares_total: { type: DataTypes.INTEGER, defaultValue: 1 },
    ativo: { type: DataTypes.BOOLEAN, defaultValue: true }
  });
  return Livro;
};
