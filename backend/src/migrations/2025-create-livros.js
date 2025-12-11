module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Livros", {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      titulo: Sequelize.STRING,
      autor: Sequelize.STRING,
      isbn: { type: Sequelize.STRING, unique: true },
      categoria: Sequelize.STRING,
      quantidadeTotal: Sequelize.INTEGER,
      quantidadeDisponivel: Sequelize.INTEGER,
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("Livros");
  }
};
