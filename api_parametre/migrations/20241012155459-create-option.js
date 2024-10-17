'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('option', {
      id_option: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      code_option: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      libelle_option: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      id_filiere: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'filiere',
          key: 'id_filiere',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('option');
  }
};