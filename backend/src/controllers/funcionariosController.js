const bcrypt = require('bcryptjs');
const db = require('../models');
const Funcionario = db.Funcionario;

module.exports = {
  // GET /api/funcionarios
  async list(req, res) {
    try {
      const funcionarios = await Funcionario.findAll({
        attributes: ['id','nome','email','role','ativo','createdAt','updatedAt']
      });
      res.json(funcionarios);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Erro ao listar funcionários' });
    }
  },

  // GET /api/funcionarios/:id
  async get(req, res) {
    try {
      const user = await Funcionario.findByPk(req.params.id, {
        attributes: ['id','nome','email','role','ativo','createdAt','updatedAt']
      });
      if (!user) return res.status(404).json({ message: 'Funcionário não encontrado' });
      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Erro ao buscar funcionário' });
    }
  },

  // POST /api/funcionarios
  async create(req, res) {
    try {
      const { nome, email, senha, role = 'bibliotecario', ativo = true } = req.body;
      if (!nome || !email || !senha) return res.status(400).json({ message: 'Nome, email e senha são obrigatórios' });

      const exists = await Funcionario.findOne({ where: { email }});
      if (exists) return res.status(400).json({ message: 'Email já cadastrado' });

      const hash = await bcrypt.hash(senha, 10);
      const novo = await Funcionario.create({ nome, email, senha: hash, role, ativo });
      const retorno = { id: novo.id, nome: novo.nome, email: novo.email, role: novo.role, ativo: novo.ativo };
      return res.status(201).json(retorno);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Erro ao criar funcionário' });
    }
  },

  // PATCH /api/funcionarios/:id
  async update(req, res) {
    try {
      const { nome, role, ativo, senha } = req.body;
      const user = await Funcionario.findByPk(req.params.id);
      if (!user) return res.status(404).json({ message: 'Funcionário não encontrado' });

      // atualiza senha se fornecida
      if (senha) {
        user.senha = await bcrypt.hash(senha, 10);
      }
      if (nome) user.nome = nome;
      if (role) user.role = role;
      if (typeof ativo === 'boolean') user.ativo = ativo;

      await user.save();
      return res.json({ message: 'Atualizado', user: { id: user.id, nome: user.nome, email: user.email, role: user.role, ativo: user.ativo }});
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Erro ao atualizar funcionário' });
    }
  },

  // DELETE /api/funcionarios/:id
  async remove(req, res) {
    try {
      const user = await Funcionario.findByPk(req.params.id);
      if (!user) return res.status(404).json({ message: 'Funcionário não encontrado' });

      await user.destroy();
      res.json({ message: 'Funcionário excluído' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Erro ao excluir funcionário' });
    }
  }
};
