const db = require("../models");

module.exports = {

    async listar(req, res) {
        try {
            const livros = await db.Livro.findAll();
            return res.json(livros);
        } catch (err) {
            console.error("Erro ao listar livros:", err);
            return res.status(500).json({ error: "Erro ao listar livros" });
        }
    },

    async criar(req, res) {
        try {
            const { titulo, autor } = req.body;
            const livro = await db.Livro.create({ titulo, autor });
            return res.json(livro);
        } catch (err) {
            console.error("Erro ao criar livro:", err);
            return res.status(500).json({ error: "Erro ao criar livro" });
        }
    },

    async atualizar(req, res) {
        try {
            const { id } = req.params;
            const { titulo, autor } = req.body;

            const livro = await db.Livro.findByPk(id);
            if (!livro) return res.status(404).json({ error: "Livro não encontrado" });

            livro.titulo = titulo;
            livro.autor = autor;
            await livro.save();

            return res.json(livro);
        } catch (err) {
            console.error("Erro ao atualizar livro:", err);
            return res.status(500).json({ error: "Erro ao atualizar livro" });
        }
    },

    async deletar(req, res) {
        try {
            const { id } = req.params;

            const livro = await db.Livro.findByPk(id);
            if (!livro) return res.status(404).json({ error: "Livro não encontrado" });

            await livro.destroy();

            return res.json({ message: "Livro deletado" });
        } catch (err) {
            console.error("Erro ao deletar livro:", err);
            return res.status(500).json({ error: "Erro ao deletar livro" });
        }
    }
};
