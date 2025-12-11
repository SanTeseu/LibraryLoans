"use strict";

const bcrypt = require("bcryptjs");

module.exports = {
  async up(queryInterface) {
    const senhaHash = await bcrypt.hash("Admin@123", 10);

    await queryInterface.bulkInsert("Funcionarios", [
      {
        nome: "Administrador",
        email: "admin@bibliotech.com",
        senha: senhaHash,
        role: "admin",
        ativo: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("Funcionarios", { email: "admin@bibliotech.com" });
  }
};
