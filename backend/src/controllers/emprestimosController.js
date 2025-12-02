const { Emprestimo, Livro, Membro, Funcionario } = require("../models");


exports.listar = async (req, res) => {
    try {
        const lista = await Emprestimo.findAll();
        res.json(lista);
    } catch {
        res.status(500).json({ erro: "Erro ao listar empréstimos." });
    }
};


exports.criar = async (req, res) => {
    const { livroId, membroId, funcionarioId, data_emprestimo, data_devolucao_prevista } = req.body;

    if (!livroId || !membroId || !funcionarioId) {
        return res.status(400).json({ erro: "Campos obrigatórios não enviados." });
    }

    try {
        const novo = await Emprestimo.create({
            livroId,
            membroId,
            funcionarioId,
            data_emprestimo,
            data_devolucao_prevista,
            status: "ativo"
        });

        res.status(201).json(novo);

    } catch {
        res.status(500).json({ erro: "Erro ao criar empréstimo." });
    }
};


exports.devolver = async (req, res) => {
    const { id } = req.params;

    try {
        const emprestimo = await Emprestimo.findByPk(id);

        if (!emprestimo) return res.status(404).json({ erro: "Empréstimo não encontrado." });

        await emprestimo.update({
            status: "devolvido",
            data_devolucao_real: new Date()
        });

        res.json({ mensagem: "Devolução registrada." });

    } catch {
        res.status(500).json({ erro: "Erro ao registrar devolução." });
    }
};

exports.deletar = async (req, res) => {
    const { id } = req.params;

    try {
        const emprestimo = await Emprestimo.findByPk(id);

        if (!emprestimo) return res.status(404).json({ erro: "Empréstimo não encontrado." });

        await emprestimo.destroy();

        res.json({ mensagem: "Empréstimo removido." });

    } catch {
        res.status(500).json({ erro: "Erro ao deletar empréstimo." });
    }
};
