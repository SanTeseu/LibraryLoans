const Membro  = require("../models");


exports.listar = async (req, res) => {
    try {
        const membros = await Membro.findAll();
        res.json(membros);
    } catch {
        res.status(500).json({ erro: "Erro ao listar membros." });
    }
};

exports.criar = async (req, res) => {
    const { nome, cpf, telefone, email } = req.body;

    if (!nome || !cpf || !email) {
        return res.status(400).json({ erro: "Nome, CPF e email são obrigatórios." });
    }

    try {
        const novo = await Membro.create({
            nome,
            cpf,
            telefone,
            email,
            status: "ativo"
        });

        res.status(201).json(novo);

    } catch (err) {
        res.status(500).json({ erro: "Erro ao criar membro." });
    }
};

exports.atualizar = async (req, res) => {
    const { id } = req.params;

    try {
        const membro = await Membro.findByPk(id);

        if (!membro) return res.status(404).json({ erro: "Membro não encontrado." });

        await membro.update(req.body);

        res.json(membro);

    } catch {
        res.status(500).json({ erro: "Erro ao atualizar membro." });
    }
};

exports.deletar = async (req, res) => {
    const { id } = req.params;

    try {
        const membro = await Membro.findByPk(id);

        if (!membro) return res.status(404).json({ erro: "Membro não encontrado." });

        await membro.destroy();

        res.json({ mensagem: "Membro removido." });

    } catch {
        res.status(500).json({ erro: "Erro ao deletar membro." });
    }
};
