const Funcionario = require('./Funcionario');
const Livro = require('./Livro');
const Membro = require('./Membro');
const Emprestimo = require('./Emprestimo');

Livro.hasMany(Emprestimo);
Emprestimo.belongsTo(Livro);

Membro.hasMany(Emprestimo);
Emprestimo.belongsTo(Membro);

Funcionario.hasMany(Emprestimo);
Emprestimo.belongsTo(Funcionario);

module.exports = {
    Funcionario,
    Livro,
    Membro,
    Emprestimo
};
