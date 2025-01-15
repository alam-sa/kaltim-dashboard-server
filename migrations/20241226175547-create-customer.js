'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Customers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      customer_id: {
        type: Sequelize.STRING,
        unique: true
      },
      customer_name: {
        type: Sequelize.STRING,
        unique: true
      },
      phone_number: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.ENUM('pelanggan', 'calon pelanggan')
      },
      service_name: {
        type: Sequelize.STRING
      },
      created_by: {
        allowNull: false,
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
    await queryInterface.addIndex('Customers', ['customer_id'], {
      name: 'customers_index_on_customer_id_uidx',
      unique: true
    });
    await queryInterface.addIndex('Customers', ['customer_name'], {
      name: 'customers_index_on_customer_name_uidx',
      unique: true
    });
    await queryInterface.addIndex('Customers', ['phone_number'], {
      name: 'customers_index_on_phone_number'
    });
    await queryInterface.addIndex('Customers', ['email'], {
      name: 'customers_index_on_email'
    });
    await queryInterface.addIndex('Customers', ['status'], {
      name: 'customers_index_on_status'
    });
    await queryInterface.addIndex('Customers', ['service_name'], {
      name: 'customers_index_on_service_name'
    });
    await queryInterface.addIndex('Customers', ['created_by'], {
      name: 'customers_index_on_created_by',
      allowNull: true
    });
    await queryInterface.addIndex('Customers', ['updated_by'], {
      name: 'customers_index_on_updated_by',
      allowNull: true
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Customers');
    await queryInterface.removeIndex('Customers', 'customers_index_on_customer_id_uidx');
    await queryInterface.removeIndex('Customers', 'customers_index_on_customer_name_uidx');
    await queryInterface.removeIndex('Customers', 'customers_index_on_phone_number');
    await queryInterface.removeIndex('Customers', 'customers_index_on_email');
    await queryInterface.removeIndex('Customers', 'customers_index_on_status');
    await queryInterface.removeIndex('Customers', 'customers_index_on_service_name');
    await queryInterface.removeIndex('Customers', 'customers_index_on_created_by');
    await queryInterface.removeIndex('Customers', 'customers_index_on_updated_by');
  }
};