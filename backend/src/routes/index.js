// src/routes/index.js - CORRIGIDO com nomes abreviados

const express = require('express');
const router = express.Router();

// --- Importações Corretas ---
// Se o arquivo de login for 'auth.js', os demais devem seguir o mesmo padrão:
const auth = require('./auth');         // Módulo de rotas de autenticação (Login)
const livros = require('./livros');     // Módulo de rotas de Livros
const membros = require('./membros');   // Módulo de rotas de Membros
const emprestimos = require('./emprestimos'); // Módulo de rotas de Empréstimos

// --- Mapeamento das Rotas ---
router.use('/auth', auth);      // Resulta em /api/auth/...
router.use('/livros', livros);  // Resulta em /api/livros/...
router.use('/membros', membros);   // Resulta em /api/membros/...
router.use('/emprestimos', emprestimos); // Resulta em /api/emprestimos/...

router.get('/health', (req, res) => res.json({ status: 'ok' }));

module.exports = router;