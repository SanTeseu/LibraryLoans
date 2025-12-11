const { Sequelize, DataTypes } = require("sequelize");
const config = require("../config/config.json").development;

const sequelize = new Sequelize({
    dialect: config.dialect,
    storage: config.storage,
    logging: false
});

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Funcionario = require("./funcionario")(sequelize, DataTypes);
db.Livro = require("./livro")(sequelize, DataTypes);
db.Membro = require("./membro")(sequelize, DataTypes);
db.Emprestimo = require("./emprestimo")(sequelize, DataTypes);

db.Livro.hasMany(db.Emprestimo, { foreignKey: "livroId", as: "emprestimos" });
db.Membro.hasMany(db.Emprestimo, { foreignKey: "membroId", as: "emprestimos" });
db.Funcionario.hasMany(db.Emprestimo, { foreignKey: "funcionarioId", as: "emprestimos" });

db.Emprestimo.belongsTo(db.Livro, { foreignKey: "livroId" });
db.Emprestimo.belongsTo(db.Membro, { foreignKey: "membroId" });
db.Emprestimo.belongsTo(db.Funcionario, { foreignKey: "funcionarioId" });

module.exports = db;
