'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Tickets', 'category_id', {
      type: Sequelize.INTEGER,
      allowNull: false, // Set to true if the foreign key can be null
      references: {
        model: 'TicketCategories', // Name of the referenced table
        key: 'id',                 // Primary key of the referenced table
      },
      onUpdate: 'CASCADE',         // Action on update
      onDelete: 'SET NULL',        // Action on delete (SET NULL, CASCADE, or RESTRICT)
    });
    await queryInterface.addIndex('Tickets', ['category_id'], {
      name: 'tickets_index_on_category_id'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Tickets', 'category_id');
    await queryInterface.removeIndex('Tickets', 'tickets_index_on_category_id');
  },
};
