'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('TicketCategories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      category_name: {
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
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
    await queryInterface.addIndex('TicketCategories', ['category_name'], {
      name: 'ticketcategories_index_on_category_name_uidx',
      unique: true
    });
    await queryInterface.addIndex('TicketCategories', ['created_by'], {
      name: 'ticketcategories_index_on_created_by'
    });
    await queryInterface.addIndex('TicketCategories', ['updated_by'], {
      name: 'ticketcategories_index_on_updated_by'
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('TicketCategories');
    await queryInterface.removeIndex('TicketCategories', 'ticketcategories_index_on_category_name_uidx');
    await queryInterface.removeIndex('TicketCategories', 'ticketcategories_index_on_created_by');
    await queryInterface.removeIndex('TicketCategories', 'ticketcategories_index_on_updated_by');
  }
};