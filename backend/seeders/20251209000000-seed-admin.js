const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface, Sequelize) {
    // 1. Gerando o hash para a senha 'Admin@123'
    // O custo (saltRounds) 10 é um bom valor padrão.
    const senhaHash = await bcrypt.hash('Admin@123', 10); 
    
    // 2. Inserindo o usuário administrador
    await queryInterface.bulkInsert('funcionarios', [{
      nome: 'Administrador Principal',
      email: 'admin@bibliotech.com',
      senha_hash: senhaHash,
      perfil: 'admin', // ESSENCIAL para a restrição de perfil (RN04)
      status: true,
      created_at: new Date(),
      updated_at: new Date()
    }], {});
  },

  async down(queryInterface, Sequelize) {
    // Para reverter o seed, remove o usuário com o email específico
    await queryInterface.bulkDelete('funcionarios', { email: 'admin@bibliotech.com' }, {});
  }
};