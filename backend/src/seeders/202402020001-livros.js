"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Livros",
      [
        {
          titulo: "1984",
          autor: "George Orwell",
          isbn: "978-0451524935",
          categoria: "Ficção",
          quantidadeTotal: 5,
          quantidadeDisponivel: 5,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          titulo: "Clean Code",
          autor: "Robert Martin",
          isbn: "978-0132350884",
          categoria: "Técnico",
          quantidadeTotal: 3,
          quantidadeDisponivel: 3,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          titulo: "O Senhor dos Anéis",
          autor: "J.R.R. Tolkien",
          isbn: "978-0544003415",
          categoria: "Fantasia",
          quantidadeTotal: 4,
          quantidadeDisponivel: 4,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          titulo: "Sapiens",
          autor: "Yuval Noah Harari",
          isbn: "978-0062316110",
          categoria: "História",
          quantidadeTotal: 2,
          quantidadeDisponivel: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Livros", null, {});
  }
};
