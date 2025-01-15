'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('AdminUsers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      full_name: {
        type: Sequelize.STRING,
        unique: true
      },
      phone_number: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING,
        unique: true
      },
      password: {
        type: Sequelize.STRING
      },
      created_by: {
        allowNull: false,
        type: Sequelize.STRING
      },
      updated_by: {
        type: Sequelize.STRING
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
    await queryInterface.addIndex('AdminUsers', ['full_name'], {
      name: "adminusers_index_on_full_name_uidx"
    });
    await queryInterface.addIndex('AdminUsers', ['phone_number'], {
      name: "adminusers_index_on_phone_number"
    });
    await queryInterface.addIndex('AdminUsers', ['email'], {
      name: "adminusers_index_on_email_uidx",
      unique: true
    });
    await queryInterface.addIndex('AdminUsers', ['created_by'], {
      name: "adminusers_index_on_created_by",
      allowNull: true
    });
    await queryInterface.addIndex('AdminUsers', ['updated_by'], {
      name: "adminusers_index_on_updated_by",
      allowNull: true
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('AdminUsers');
    await queryInterface.removeIndex('AdminUsers', "adminusers_index_on_full_name_uidx");
    await queryInterface.removeIndex('AdminUsers', "adminusers_index_on_phone_number");
    await queryInterface.removeIndex('AdminUsers', "adminusers_index_on_email_uidx");
    await queryInterface.removeIndex('AdminUsers', "adminusers_index_on_created_by");
    await queryInterface.removeIndex('AdminUsers', "adminusers_index_on_updated_by");
  }
};