"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Membros",
      [
        {
          nome: "Ana Costa",
          cpf: "111.222.333-44",
          email: "ana@cliente.com",
          telefone: "11 90000-1111",
          status: "ativo",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nome: "Carlos Lima",
          cpf: "222.333.444-55",
          email: "carlos@cliente.com",
          telefone: "11 90000-2222",
          status: "ativo",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nome: "Julia Rocha",
          cpf: "333.444.555-66",
          email: "julia@cliente.com",
          telefone: "11 90000-3333",
          status: "suspenso",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("Membros", null, {});
  },
};
