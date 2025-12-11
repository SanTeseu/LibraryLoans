const app = require("./app");
const db = require('./models');
const bcrypt = require("bcryptjs");
const authRoutes = require('./routes/auth');


app.use('/api/auth', authRoutes);

const PORT = 4000;

(async () => {
    try {
        await db.sequelize.authenticate();
        console.log("Banco conectado com sucesso.");

        await db.sequelize.sync();
        console.log("Banco sincronizado.");

        // ===== CRIAR ADMIN =====
        const adminEmail = "admin@bibliotech.com";

        const existingAdmin = await db.Funcionario.findOne({
            where: { email: adminEmail }
        });

        if (!existingAdmin) {
            const hashed = await bcrypt.hash("Admin@123", 10);

            await db.Funcionario.create({
                nome: "Administrador",
                email: adminEmail,
                senha: hashed,
                role: "admin",
                ativo: true
            });

            console.log("Administrador padrão criado!");
        }

        app.listen(PORT, () =>
            console.log("Servidor rodando na porta", PORT)
        );
    } catch (err) {
        console.error("Erro ao iniciar:", err);
    }
})();
