const { Livro, Emprestimo } = require('../models');
const { validationResult } = require('express-validator');

async function list(req, res){
  const q = {};
  if(req.query.titulo) q.titulo = req.query.titulo;
  const livros = await Livro.findAll();
  return res.json(livros);
}

async function disponibilidade(req, res){
  const id = req.params.id;
  const livro = await Livro.findByPk(id);
  if(!livro) return res.status(404).json({ error: 'Livro não encontrado' });
  const ativos = await Emprestimo.count({ where: { livroId: id, status: 'ativo' }});
  const disponiveis = livro.exemplares_total - ativos;
  return res.json({ disponiveis: Math.max(0, disponiveis), exemplares_total: livro.exemplares_total });
}

async function create(req, res){
  const errors = validationResult(req);
  if(!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const { titulo, autor, isbn, exemplares_total } = req.body;
  try {
    const livro = await Livro.create({ titulo, autor, isbn, exemplares_total });
    return res.status(201).json(livro);
  } catch(e){
    return res.status(400).json({ error: e.message });
  }
}

async function update(req, res){
  const id = req.params.id;
  const livro = await Livro.findByPk(id);
  if(!livro) return res.status(404).json({ error: 'Livro não encontrado' });
  const { titulo, autor, isbn, exemplares_total, ativo } = req.body;
  await livro.update({ titulo, autor, isbn, exemplares_total, ativo });
  return res.json(livro);
}

async function remove(req, res){
  const id = req.params.id;
  const livro = await Livro.findByPk(id);
  if(!livro) return res.status(404).json({ error: 'Livro não encontrado' });
  await livro.destroy();
  return res.json({ ok: true });
}

module.exports = { list, disponibilidade, create, update, remove };
