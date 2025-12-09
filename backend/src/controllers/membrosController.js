const db = require('../models'); 
const Membro = db.Membro;
const { validationResult } = require('express-validator');

// Listar todos os membros (RF06 - Listar)
exports.list = async (req, res) => {
    try {
        const membros = await Membro.findAll({
            // Exclui a contagem de empréstimos ativos para otimizar, se necessário
            where: { ativo: true }, // Lista apenas membros ativos por padrão
        });

        return res.status(200).json(membros);
    } catch (error) {
        console.error('Erro ao listar membros:', error);
        return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};

// Criar novo membro (RF06 - Cadastrar)
exports.create = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { nome, email, cpf } = req.body;

    try {
        const novoMembro = await Membro.create({
            nome,
            email,
            cpf,
            ativo: true // Sempre cria ativo
        });
        return res.status(201).json(novoMembro);

    } catch (error) {
        // Lida com erros de validação (ex: E-mail ou CPF já existe - RN06)
        if (error.name === 'SequelizeUniqueConstraintError') {
            const field = error.errors[0].path === 'email' ? 'E-mail' : 'CPF';
            return res.status(409).json({ error: `${field} já cadastrado no sistema.` });
        }
        console.error('Erro ao criar membro:', error);
        return res.status(500).json({ error: 'Erro ao cadastrar o membro.' });
    }
};

// Atualizar membro (RF06 - Atualizar)
exports.update = async (req, res) => {
    const id = req.params.id;
    const { nome, email, cpf, ativo } = req.body;

    try {
        const membro = await Membro.findByPk(id);
        if (!membro) return res.status(404).json({ error: 'Membro não encontrado' });

        await membro.update({ nome, email, cpf, ativo });
        return res.status(200).json(membro);

    } catch (error) {
        // Lida com erro de CPF/E-mail duplicado ao tentar atualizar (RN06)
        if (error.name === 'SequelizeUniqueConstraintError') {
             const field = error.errors[0].path === 'email' ? 'E-mail' : 'CPF';
             return res.status(409).json({ error: `${field} já cadastrado por outro membro.` });
        }
        console.error('Erro ao atualizar membro:', error);
        return res.status(500).json({ error: 'Erro ao atualizar o membro.' });
    }
};

// Remover/Desativar membro (RF06 - Remover)
exports.remove = async (req, res) => {
    const id = req.params.id;

    try {
        const membro = await Membro.findByPk(id);
        if (!membro) return res.status(404).json({ error: 'Membro não encontrado' });

        // RN07: Proibido excluir membro com empréstimos ativos (Será implementado com a Emprestimo)

        // Por enquanto, apenas desativa o membro.
        await membro.update({ ativo: false });
        // Ou para exclusão física:
        // await membro.destroy(); 
        
        return res.status(200).json({ message: 'Membro desativado com sucesso (ou excluído).' });

    } catch (error) {
        console.error('Erro ao remover membro:', error);
        return res.status(500).json({ error: 'Erro ao remover o membro.' });
    }
};

// Exporta todas as funções
module.exports = { list, create, update, remove };