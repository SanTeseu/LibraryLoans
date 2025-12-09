const { Funcionario } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

async function login(req, res) {
  const { email, senha } = req.body;

  if (!email || !senha)
    return res.status(400).json({ error: 'email e senha são obrigatórios' });

  const user = await Funcionario.findOne({ where: { email } });

  if (!user)
    return res.status(401).json({ error: 'Credenciais inválidas' });

  if (!user.status)
    return res.status(403).json({ error: 'Funcionário inativo' });

  const ok = await bcrypt.compare(senha, user.senha_hash);

  if (!ok)
    return res.status(401).json({ error: 'Credenciais inválidas' });

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      perfil: user.perfil,
    },
    process.env.JWT_SECRET || 'troque_esta_chave',
    { expiresIn: '8h' }
  );

  return res.json({ token });
}

module.exports = { login };
