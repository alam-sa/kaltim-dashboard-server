'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Customers', 'type_id', {
      type: Sequelize.INTEGER,
      allowNull: false, // Set to true if the foreign key can be null
      references: {
        model: 'CustomerTypes', // Name of the referenced table
        key: 'id',                 // Primary key of the referenced table
      },
      onUpdate: 'CASCADE',         // Action on update
      onDelete: 'SET NULL',        // Action on delete (SET NULL, CASCADE, or RESTRICT)
    });
    await queryInterface.addIndex('Customers', ['type_id'], {
      name: 'customers_index_on_type_id'
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Customers', 'type_id');
    await queryInterface.removeIndex('Customers', 'customers_index_on_type_id');
  },
};
