'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('AdminRoles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      role_name: {
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
    await queryInterface.addIndex('AdminRoles', ['role_name'], {
      name: 'adminroles_index_on_role_name_uidx',
      unique: true
    });
    await queryInterface.addIndex('AdminRoles', ['created_by'], {
      name: 'adminroles_index_on_created_by',
    });
    await queryInterface.addIndex('AdminRoles', ['updated_by'], {
      name: 'adminroles_index_on_updated_by',
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('AdminRoles');
    await queryInterface.removeIndex('AdminRoles', 'adminroles_index_on_role_name_uidx');
    await queryInterface.removeIndex('AdminRoles', 'adminroles_index_on_created_by');
    await queryInterface.removeIndex('AdminRoles', 'adminroles_index_on_updated_by');
  }
};