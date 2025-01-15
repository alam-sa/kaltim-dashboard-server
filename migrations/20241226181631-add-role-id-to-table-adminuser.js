'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('AdminUsers', 'role_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'AdminRoles',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
    await queryInterface.addIndex('AdminUsers', ['role_id'], {
      name: 'adminusers_index_on_role_id'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('AdminUsers', 'role_id');
    await queryInterface.removeIndex('AdminUsers', 'adminusers_index_on_role_id');
  },
};
