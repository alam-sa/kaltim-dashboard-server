'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Customers', 'sales_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'SalesUsers',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
    await queryInterface.addIndex('Customers', ['sales_id'], {
      name: 'customers_index_on_sales_id'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Customers', 'sales_id');
    await queryInterface.removeIndex('Customers', 'customers_index_on_sales_id');
  },
};
