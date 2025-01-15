'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CustomerTypes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      customer_type: {
        type: Sequelize.STRING,
        unique: true
      },
      description: {
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
    await queryInterface.addIndex('CustomerTypes', ['customer_type'], {
      name: 'customertypes_index_on_customer_type_uidx',
      unique: true
    });
    await queryInterface.addIndex('CustomerTypes', ['created_by'], {
      name: 'customertypes_index_on_created_by',
      allowNull: true
    });
    await queryInterface.addIndex('CustomerTypes', ['updated_by'], {
      name: 'customertypes_index_on_updated_by',
      allowNull: true
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('CustomerTypes');
    await queryInterface.removeIndex('CustomerTypes', 'customertypes_index_on_customer_type_uidx');
    await queryInterface.removeIndex('CustomerTypes', 'customertypes_index_on_created_by');
    await queryInterface.removeIndex('CustomerTypes', 'customertypes_index_on_updated_by');
  }
};