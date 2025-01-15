'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Tickets', 'subcategory_id', {
      type: Sequelize.INTEGER,
      allowNull: false, // Set to true if the foreign key can be null
      references: {
        model: 'TicketSubcategories', // Name of the referenced table
        key: 'id',                 // Primary key of the referenced table
      },
      onUpdate: 'CASCADE',         // Action on update
      onDelete: 'SET NULL',        // Action on delete (SET NULL, CASCADE, or RESTRICT)
    });
    await queryInterface.addIndex('Tickets', ['subcategory_id'], {
      name: 'tickets_index_on_subcategory_id'
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Tickets', 'subcategory_id');
    await queryInterface.removeIndex('Tickets', 'tickets_index_on_subcategory_id');
  },
};
