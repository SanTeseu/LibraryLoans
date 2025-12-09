const { Emprestimo, Livro, Membro } = require('../models');
const { validationResult } = require('express-validator');
const { Op } = require('sequelize');

function diffDays(a, b){
  const A = new Date(a);
  const B = new Date(b);
  const diff = Math.ceil((A - B) / (1000*60*60*24));
  return diff;
}

async function create(req, res){
  const errors = validationResult(req);
  if(!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const { livroId, membroId, data_retirada, data_devolucao_prevista } = req.body;
  const funcionarioId = req.user.id;

  const membro = await Membro.findByPk(membroId);
  if(!membro) return res.status(404).json({ error: 'Membro não encontrado' });
  if(membro.status !== 'ativo') return res.status(400).json({ error: 'Membro suspenso' });

  const livro = await Livro.findByPk(livroId);
  if(!livro) return res.status(404).json({ error: 'Livro não encontrado' });
  const ativos = await Emprestimo.count({ where: { livroId, status: 'ativo' }});
  const disponiveis = livro.exemplares_total - ativos;
  if(disponiveis <= 0) return res.status(400).json({ error: 'Nenhum exemplar disponível' });

  // create emprestimo
  const emp = await Emprestimo.create({
    livroId, membroId, funcionarioId, data_retirada, data_devolucao_prevista, status: 'ativo'
  });
  return res.status(201).json(emp);
}

async function devolver(req, res){
  const id = req.params.id;
  const emprestimo = await Emprestimo.findByPk(id);
  if(!emprestimo) return res.status(404).json({ error: 'Empréstimo não encontrado' });
  if(emprestimo.status !== 'ativo') return res.status(400).json({ error: 'Empréstimo já finalizado' });

  const hoje = new Date().toISOString().slice(0,10);
  const diasAtraso = Math.max(0, diffDays(hoje, emprestimo.data_devolucao_prevista));
  const valorMulta = diasAtraso * 2.0;

  emprestimo.data_devolucao_real = hoje;
  emprestimo.dias_atraso = diasAtraso;
  emprestimo.valor_multa = valorMulta;
  emprestimo.status = 'devolvido';
  await emprestimo.save();

  // se atraso > 7 dias, suspende membro
  if(diasAtraso > 7){
    const membro = await Membro.findByPk(emprestimo.membroId);
    if(membro){
      membro.status = 'suspenso';
      await membro.save();
    }
  }

  return res.json(emprestimo);
}

async function list(req, res){
  const where = {};
  if(req.query.status) where.status = req.query.status;
  const emprestimos = await Emprestimo.findAll({ where, include: [Livro, Membro] });
  return res.json(emprestimos);
}

async function atrasados(req, res){
  const hoje = new Date().toISOString().slice(0,10);
  const atrasados = await Emprestimo.findAll({
    where: { status: 'ativo', data_devolucao_prevista: { [Op.lt]: hoje } },
    include: [Livro, Membro]
  });
  return res.json(atrasados);
}

module.exports = { create, devolver, list, atrasados };
