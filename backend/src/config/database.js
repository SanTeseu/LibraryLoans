require('dotenv').config(); //carrega as variaveis do ambiente do .env

module.exports = {
  dialect: 'sqlite',
  
  // O storage é o caminho físico do arquivo SQLite
  // Extrai o caminho após 'sqlite:' do DATABASE_URL
  storage: process.env.DATABASE_URL.replace('sqlite:', ''),
  
  // Define o logging para ser silencioso menos em desenvolvimento
  logging: false, // conole.log debugger de cria(zero erros)
  
  
  define: {
    timestamps: true, // marca o "tempo" de atualziação dos dados no itema
    underscored: true, //  colunas separadas por underline (created_at)
  }

  // Execute o comando de inicialização. Isso irá criar as pastas config, migrations, seeders na raiz do seu backend:
//npx sequelize-cli init
//se der errado (npm install --save-dev sequelize-cli)

};

