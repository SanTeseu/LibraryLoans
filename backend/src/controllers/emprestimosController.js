const db = require("../models");

module.exports = {
  async listar(req, res) {
    try {
      const lista = await db.Emprestimo.findAll({
        include: [
          { model: db.Livro },
          { model: db.Membro },
          { model: db.Funcionario },
        ],
        order: [["id", "DESC"]],
      });

      res.json(lista);
    } catch (err) {
      console.error("Erro listar empréstimos:", err);
      res.status(500).json({ error: "Erro ao listar empréstimos" });
    }
  },

  async criar(req, res) {
    try {
      const { aluno_id, livro_id, data_prevista } = req.body;

      // verifica se o aluno está suspenso
      const aluno = await Aluno.findByPk(aluno_id);

      if (aluno.suspenso) {
        const agora = new Date();
        if (aluno.suspenso_ate && agora < aluno.suspenso_ate) {
          return res.status(403).json({
            error: `Aluno suspenso até ${aluno.suspenso_ate.toLocaleDateString()}`,
          });
        }

        // suspensão terminou → limpa
        aluno.suspenso = false;
        aluno.suspenso_ate = null;
        await aluno.save();
      }

      const livro = await Livro.findByPk(livro_id);

      if (!livro)
        return res.status(404).json({ error: "Livro não encontrado" });

      if (livro.quantidade_disponivel <= 0)
        return res.status(400).json({ error: "Não há exemplares disponíveis" });

      // cria o empréstimo
      const emprestimo = await Emprestimo.create({
        aluno_id,
        livro_id,
        data_emprestimo: new Date(),
        data_prevista,
      });

      // reduz um exemplar disponível
      livro.quantidade_disponivel -= 1;
      await livro.save();

      res.json(emprestimo);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Erro ao registrar empréstimo" });
    }
  },

  async devolver(req, res) {
    try {
      const { id } = req.params;

      const emprestimo = await Emprestimo.findByPk(id, {
        include: Livro,
      });

      if (!emprestimo)
        return res.status(404).json({ error: "Empréstimo não encontrado" });

      if (emprestimo.data_devolucao)
        return res.status(400).json({ error: "Livro já devolvido" });

      const hoje = new Date();
      const prevista = new Date(emprestimo.data_prevista);
      let multa = 0;

      const VALOR_DIA = 2.0; // R$ 2,00 por dia de atraso

      if (hoje > prevista) {
        const diffTime = hoje - prevista;
        const dias = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        multa = dias * VALOR_DIA;
      }

      emprestimo.data_devolucao = hoje;
      emprestimo.multa = multa;
      await emprestimo.save();

      // --- SUSPENSÃO AUTOMÁTICA ---
      if (diasAtraso > 0) {
        const aluno = await Aluno.findByPk(emprestimo.aluno_id);

        const hoje = new Date();
        const suspensaoDias = diasAtraso; // 1 dia de suspensão por 1 dia de atraso

        const suspensoAte = new Date();
        suspensoAte.setDate(hoje.getDate() + suspensaoDias);

        aluno.suspenso = true;
        aluno.suspenso_ate = suspensoAte;
        await aluno.save();
      }

      // devolve 1 exemplar ao estoque
      emprestimo.Livro.quantidade_disponivel += 1;
      await emprestimo.Livro.save();

      // liberar livro
      await emprestimo.Livro.update({ disponivel: true });

      res.json({
        message: "Devolução registrada!",
        diasAtraso: multa > 0 ? multa / VALOR_DIA : 0,
        multa,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Erro ao devolver livro" });
    }
  },

  async remover(req, res) {
    try {
      const { id } = req.params;

      const emp = await db.Emprestimo.findByPk(id);
      if (!emp)
        return res.status(404).json({ error: "Empréstimo não encontrado" });

      await emp.destroy();
      res.json({ message: "Empréstimo removido" });
    } catch (err) {
      res.status(500).json({ error: "Erro ao remover empréstimo" });
    }
  },
};
