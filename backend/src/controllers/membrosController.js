const db = require('../models');
const Membro = db.Membro;
const Emprestimo = db.Emprestimo;

module.exports = {
  // GET /api/membros
  async list(req, res) {
    try {
      const membros = await Membro.findAll();
      res.json(membros);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Erro ao listar membros' });
    }
  },

  // GET /api/membros/:id
  async get(req, res) {
    try {
      const membro = await Membro.findByPk(req.params.id);
      if (!membro) return res.status(404).json({ message: 'Membro não encontrado' });
      res.json(membro);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Erro ao buscar membro' });
    }
  },

  // POST /api/membros
  async create(req, res) {
    try {
      const { nome, email, telefone } = req.body;
      if (!nome) return res.status(400).json({ message: 'Nome é obrigatório' });

      const membro = await Membro.create({ nome, email, telefone });
      res.status(201).json(membro);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Erro ao criar membro' });
    }
  },

  // PUT /api/membros/:id
  async update(req, res) {
    try {
      const membro = await Membro.findByPk(req.params.id);
      if (!membro) return res.status(404).json({ message: 'Membro não encontrado' });

      const { nome, email, telefone } = req.body;
      membro.nome = nome ?? membro.nome;
      membro.email = email ?? membro.email;
      membro.telefone = telefone ?? membro.telefone;

      await membro.save();
      res.json(membro);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Erro ao atualizar membro' });
    }
  },

  // DELETE /api/membros/:id
  async remove(req, res) {
    try {
      const membro = await Membro.findByPk(req.params.id);
      if (!membro) return res.status(404).json({ message: 'Membro não encontrado' });

      const emprestimoAtivo = await Emprestimo.findOne({ where: { membroId: membro.id, dataDevolucao: null } });
      if (emprestimoAtivo) return res.status(400).json({ message: 'Não é possível excluir: possui empréstimos ativos.' });

      await membro.destroy();
      res.json({ message: 'Membro excluído' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Erro ao excluir membro' });
    }
  },

  // GET /api/membros/:id/emprestimos
  async emprestimosDoMembro(req, res) {
    try {
      const emprestimos = await Emprestimo.findAll({
        where: { membroId: req.params.id },
        include: [{ model: db.Livro, as: 'Livro' }]
      });
      res.json(emprestimos);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Erro ao buscar empréstimos do membro' });
    }
  }
};
