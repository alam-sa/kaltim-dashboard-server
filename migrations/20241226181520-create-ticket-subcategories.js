'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('TicketSubcategories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      subcategory_name: {
        type: Sequelize.STRING
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
    await queryInterface.addIndex('TicketSubcategories', ['subcategory_name'], {
      name: 'ticketsubcategories_index_on_subcategory_name_uidx',
      unique: true
    });
    await queryInterface.addIndex('TicketSubcategories', ['created_by'], {
      name: 'ticketsubcategories_index_on_created_by'
    });
    await queryInterface.addIndex('TicketSubcategories', ['updated_by'], {
      name: 'ticketsubcategories_index_on_updated_by'
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('TicketSubcategories');
    await queryInterface.removeIndex('TicketSubcategories', 'ticketsubcategories_index_on_subcategory_name_uidx');
    await queryInterface.removeIndex('TicketSubcategories', 'ticketsubcategories_index_on_created_by');
    await queryInterface.removeIndex('TicketSubcategories', 'ticketsubcategories_index_on_updated_by');
  }
};