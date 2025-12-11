// seed.js
const db = require("./models");
const bcrypt = require("bcryptjs");

(async () => {
    try {
        await db.sequelize.authenticate();
        console.log("Banco conectado!");

        await db.sequelize.sync({ force: true });
        console.log("Tabelas recriadas!");

        // ==========================
        // FUNCIONÁRIOS
        // ==========================
        const adminPass = await bcrypt.hash("Admin@123", 10);
        const biblioPass = await bcrypt.hash("Biblio@123", 10);

        const admin = await db.Funcionario.create({
            nome: "Administrador",
            email: "admin@bibliotech.com",
            senha: adminPass,
            role: "admin",
            ativo: true
        });

        const bibliotecario = await db.Funcionario.create({
            nome: "Bibliotecário",
            email: "biblio@bibliotech.com",
            senha: biblioPass,
            role: "bibliotecario",
            ativo: true
        });

        // ==========================
        // MEMBROS
        // ==========================
        const ana = await db.Membro.create({
            nome: "Ana Costa",
            cpf: "111.222.333-44",
            status: "ativo"
        });

        const carlos = await db.Membro.create({
            nome: "Carlos Lima",
            cpf: "222.333.444-55",
            status: "ativo"
        });

        const julia = await db.Membro.create({
            nome: "Julia Rocha",
            cpf: "333.444.555-66",
            status: "suspenso"
        });

        // ==========================
        // LIVROS
        // ==========================
        const l1984 = await db.Livro.create({
            titulo: "1984",
            autor: "George Orwell",
            isbn: "978-0451524935",
            categoria: "Ficção",
            quantidade: 5
        });

        const cleanCode = await db.Livro.create({
            titulo: "Clean Code",
            autor: "Robert Martin",
            isbn: "978-0132350884",
            categoria: "Técnico",
            quantidade: 3
        });

        const lotr = await db.Livro.create({
            titulo: "O Senhor dos Anéis",
            autor: "J.R.R. Tolkien",
            isbn: "978-0544003415",
            categoria: "Fantasia",
            quantidade: 4
        });

        const sapiens = await db.Livro.create({
            titulo: "Sapiens",
            autor: "Yuval Noah Harari",
            isbn: "978-0062316110",
            categoria: "História",
            quantidade: 2
        });

        // ==========================
        // EMPRÉSTIMOS
        // ==========================
        // 1) 1984 para Ana Costa - ativo
        await db.Emprestimo.create({
            livroId: l1984.id,
            membroId: ana.id,
            funcionarioId: bibliotecario.id,
            status: "ativo",
            dataPrevista: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
        });

        // 2) Clean Code para Carlos - devolvido
        await db.Emprestimo.create({
            livroId: cleanCode.id,
            membroId: carlos.id,
            funcionarioId: bibliotecario.id,
            status: "devolvido",
            dataPrevista: new Date(),
            dataDevolucao: new Date()
        });

        // 3) Sapiens para Julia - atrasado
        const diasAtraso = 10;
        const multa = diasAtraso * 2; // R$2 por dia

        await db.Emprestimo.create({
            livroId: sapiens.id,
            membroId: julia.id,
            funcionarioId: bibliotecario.id,
            status: "atrasado",
            dataPrevista: new Date(Date.now() - diasAtraso * 24 * 60 * 60 * 1000),
            multa: multa
        });

        console.log("SEED concluído com sucesso!");
        process.exit();

    } catch (err) {
        console.error("Erro no seed:", err);
        process.exit(1);
    }
})();
