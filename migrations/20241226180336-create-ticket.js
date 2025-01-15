'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Tickets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ticket_number: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      status: {
        type: Sequelize.ENUM('new', 'on progress', 'completed', 'confirmed')
      },
      priority: {
        type: Sequelize.ENUM('low', 'medium', 'high')
      },
      work_scope: {
        type: Sequelize.STRING
      },
      access_type: {
        type: Sequelize.STRING
      },
      pic: {
        type: Sequelize.STRING
      },
      type_of_fault: {
        type: Sequelize.STRING
      },
      image1: {
        type: Sequelize.STRING
      },
      image2: {
        type: Sequelize.STRING
      },
      image3: {
        type: Sequelize.STRING
      },
      image4: {
        type: Sequelize.STRING
      },
      created_by: {
        allowNull: false,
        type: Sequelize.STRING
      },
      updated_by: {
        type: Sequelize.STRING
      },
      completed_at: {
        type: Sequelize.DATE
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
    await queryInterface.addIndex('Tickets', ['ticket_number'], {
      name: 'tickets_index_on_ticket_number_uidx',
      unique: true
    });
    await queryInterface.addIndex('Tickets', ['status'], {
      name: 'tickets_index_on_status'
    });
    await queryInterface.addIndex('Tickets', ['priority'], {
      name: 'tickets_index_on_priority'
    });
    await queryInterface.addIndex('Tickets', ['work_scope'], {
      name: 'tickets_index_on_work_scope'
    });
    await queryInterface.addIndex('Tickets', ['access_type'], {
      name: 'tickets_index_on_access_type'
    });
    await queryInterface.addIndex('Tickets', ['pic'], {
      name: 'tickets_index_on_pic'
    });
    await queryInterface.addIndex('Tickets', ['type_of_fault'], {
      name: 'tickets_index_on_type_of_fault'
    });
    await queryInterface.addIndex('Tickets', ['created_by'], {
      name: 'tickets_index_on_created_by',
      allowNull: true
    });
    await queryInterface.addIndex('Tickets', ['updated_by'], {
      name: 'tickets_index_on_updated_by',
      allowNull: true
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Tickets');
    await queryInterface.removeIndex('Tickets', 'tickets_index_on_ticket_number_uidx');
    await queryInterface.removeIndex('Tickets', 'tickets_index_on_status');
    await queryInterface.removeIndex('Tickets', 'tickets_index_on_priority');
    await queryInterface.removeIndex('Tickets', 'tickets_index_on_work_scope');
    await queryInterface.removeIndex('Tickets', 'tickets_index_on_access_type');
    await queryInterface.removeIndex('Tickets', 'tickets_index_on_pic');
    await queryInterface.removeIndex('Tickets', 'tickets_index_on_type_of_fault');
    await queryInterface.removeIndex('Tickets', 'tickets_index_on_created_by');
    await queryInterface.removeIndex('Tickets', 'tickets_index_on_pic_updated_by');
  }
};