'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Tickets', 'area_id', {
      type: Sequelize.INTEGER,
      allowNull: false, // Set to true if the foreign key can be null
      references: {
        model: 'Areas', // Name of the referenced table
        key: 'id',                 // Primary key of the referenced table
      },
      onUpdate: 'CASCADE',         // Action on update
      onDelete: 'SET NULL',        // Action on delete (SET NULL, CASCADE, or RESTRICT)
    });
    await queryInterface.addIndex('Tickets', ['area_id'], {
      name: 'tickets_index_on_area_id'
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Tickets', 'area_id');
    await queryInterface.removeIndex('Tickets', 'tickets_index_on_area_id');
  },
};
