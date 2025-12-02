const { Livro } = require("../models");


exports.listar = async (req, res) => {
    try {
        const livros = await Livro.findAll();
        res.json(livros);
    } catch {
        res.status(500).json({ erro: "Erro ao listar livros." });
    }
};

exports.criar = async (req, res) => {
    const { titulo, autor, isbn, categoria, exemplares_total } = req.body;

    if (!titulo || !isbn) {
        return res.status(400).json({ erro: "Título e ISBN são obrigatórios." });
    }

    try {
        const livro = await Livro.create({
            titulo,
            autor,
            isbn,
            categoria,
            exemplares_total,
            ativo: true
        });

        res.status(201).json(livro);

    } catch (err) {
        res.status(500).json({ erro: "Erro ao criar livro." });
    }
};


exports.atualizar = async (req, res) => {
    const { id } = req.params;

    try {
        const livro = await Livro.findByPk(id);

        if (!livro) return res.status(404).json({ erro: "Livro não encontrado." });

        await livro.update(req.body);

        res.json(livro);

    } catch {
        res.status(500).json({ erro: "Erro ao atualizar livro." });
    }
};


exports.deletar = async (req, res) => {
    const { id } = req.params;

    try {
        const livro = await Livro.findByPk(id);

        if (!livro) return res.status(404).json({ erro: "Livro não encontrado." });

        await livro.destroy();

        res.json({ mensagem: "Livro removido." });

    } catch {
        res.status(500).json({ erro: "Erro ao deletar livro." });
    }
};
