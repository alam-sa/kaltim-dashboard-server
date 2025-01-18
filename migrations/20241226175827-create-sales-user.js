'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('SalesUsers', {
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
    await queryInterface.addIndex('SalesUsers', ['full_name'], {
      name: 'salesusers_index_on_full_name'
    });
    await queryInterface.addIndex('SalesUsers', ['phone_number'], {
      name: 'salesusers_index_on_phone_number'
    });
    await queryInterface.addIndex('SalesUsers', ['email'], {
      name: 'salesusers_index_on_email_uidx',
      unique: true
    });
    await queryInterface.addIndex('SalesUsers', ['created_by'], {
      name: 'salesusers_index_on_created_by',
      allowNull: true
    });
    await queryInterface.addIndex('SalesUsers', ['updated_by'], {
      name: 'salesusers_index_on_updated_by',
      allowNull: true
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('SalesUsers');
    await queryInterface.removeIndex('SalesUsers', 'salesusers_index_on_full_name');
    await queryInterface.removeIndex('SalesUsers', 'salesusers_index_on_phone_number');
    await queryInterface.removeIndex('SalesUsers', 'salesusers_index_on_email_uidx');
    await queryInterface.removeIndex('SalesUsers', 'salesusers_index_on_created_by');
    await queryInterface.removeIndex('SalesUsers', 'salesusers_index_on_updated_by');
  }
};