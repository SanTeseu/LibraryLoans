"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Membros", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      nome: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      cpf: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },

      email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: true,
      },

      telefone: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      status: {
        type: Sequelize.ENUM("ativo", "suspenso", "inativo"),
        defaultValue: "ativo",
      },

      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },

      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("Membros");
  },
};
