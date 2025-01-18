'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Areas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      area_name: {
        type: Sequelize.STRING
      },
      office_address: {
        type: Sequelize.TEXT
      },
      created_by: {
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
    await queryInterface.addIndex('Areas', ['area_name'], {
      name: 'areas_index_on_area_name',
      allowNull: true
    });
    await queryInterface.addIndex('Areas', ['created_by'], {
      name: 'areas_index_on_created_by',
      allowNull: true
    });
    await queryInterface.addIndex('Areas', ['updated_by'], {
      name: 'areas_index_on_updated_by',
      allowNull: true
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Areas');
    await queryInterface.removeIndex('Areas', 'areas_index_on_area_name');
    await queryInterface.removeIndex('Areas', 'areas_index_on_created_by');
    await queryInterface.removeIndex('Areas', 'areas_index_on_updated_by');
  }
};