const bcrypt = require("bcrypt");
const { Funcionario } = require("../models");


const SALT_ROUNDS = 10;


exports.listar = async (req, res) => {
    try {
        const lista = await Funcionario.findAll();
        res.json(lista);
    } catch (err) {
        res.status(500).json({ erro: "Erro ao listar funcionários." });
    }
};

exports.criar = async (req, res) => {
    const { nome, email, senha, perfil, status } = req.body;

    if (!nome || !email || !senha) {
        return res.status(400).json({ erro: "Nome, email e senha são obrigatórios." });
    }

    try {
        const existente = await Funcionario.findOne({ where: { email } });

        if (existente) {
            return res.status(400).json({ erro: "E-mail já está em uso." });
        }

        const senha_hash = await bcrypt.hash(senha, SALT_ROUNDS);

        const funcionario = await Funcionario.create({
            nome,
            email,
            perfil,
            status,
            senha_hash
        });

        res.status(201).json(funcionario);

    } catch (err) {
        res.status(500).json({ erro: "Erro ao criar funcionário." });
    }
};

exports.atualizar = async (req, res) => {
    const { id } = req.params;

    try {
        const funcionario = await Funcionario.findByPk(id);

        if (!funcionario)
            return res.status(404).json({ erro: "Funcionário não encontrado." });

        await funcionario.update(req.body);

        res.json(funcionario);
    } catch (err) {
        res.status(500).json({ erro: "Erro ao atualizar funcionário." });
    }
};

exports.deletar = async (req, res) => {
    const { id } = req.params;

    try {
        const funcionario = await Funcionario.findByPk(id);

        if (!funcionario)
            return res.status(404).json({ erro: "Funcionário não encontrado." });

        await funcionario.destroy();
        res.json({ mensagem: "Funcionário removido." });
    } catch (err) {
        res.status(500).json({ erro: "Erro ao deletar funcionário." });
    }
};
