// Carrega as variáveis de ambiente do arquivo .env
require('dotenv').config();

// Importa a instância da aplicação Express (middlewares, setup) do app.js
const app = require('./app'); 

// Importa o objeto do Sequelize para sincronização do DB
const db = require('./models'); 

// --- 🚨 CORREÇÃO DE IMPORTS 🚨 ---
// Importa os arquivos de rotas usando os nomes corretos (ex: auth.js, livros.js, etc.)
const routes = require('./routes'); // Importa o router principal (index.js)

const PORT = process.env.PORT || 4000;

// --- Registro das Rotas ---
// Assumimos que o router principal (index.js) anexa todas as sub-rotas
app.use('/api', routes); 


// --- Inicialização do Servidor e Banco de Dados ---
async function startServer() {
    try {
        // Sincroniza o banco de dados (cria/atualiza tabelas se necessário)
        // Isso também dispara a lógica de "seeding" no app.js, se você a manteve lá.
        await db.sequelize.sync();
        console.log('✅ Banco de dados sincronizado.');

        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });

    } catch (error) {
        console.error('❌ Erro FATAL ao iniciar o servidor ou DB:', error);
        // Termina o processo se houver erro crítico no banco de dados.
        process.exit(1); 
    }
}

startServer();