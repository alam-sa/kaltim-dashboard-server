'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ticket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Ticket.hasOne(models.TicketCategories, { foreignKey: 'category_id' });
      Ticket.hasOne(models.TicketSubcategories, { foreignKey: 'subcategory_id' });

    }
  }
  Ticket.init({
    ticket_number: DataTypes.STRING,
    description: DataTypes.TEXT,
    status: DataTypes.ENUM('new', 'on progress', 'completed', 'confirmed'),
    priority: DataTypes.ENUM('low', 'medium', 'high'),
    work_scope: DataTypes.STRING,
    access_type: DataTypes.STRING,
    pic: DataTypes.STRING,
    type_of_fault: DataTypes.STRING,
    image1: DataTypes.STRING,
    image2: DataTypes.STRING,
    image3: DataTypes.STRING,
    image4: DataTypes.STRING,
    created_by: DataTypes.STRING,
    updated_by: DataTypes.STRING,
    completed_at: DataTypes.DATE,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Ticket',
    hooks: {
      beforeCreate: (ticket, options) => {
        if (!ticket.created_by) {
          ticket.created_by = 'System';
        }
      },
      beforeUpdate: (ticket, options) => {
        ticket.created_by = ticket._previousDataValues.created_by;
        if (!ticket.updated_by) {
          ticket.updated_by = 'System';
        }
      }
    }
  });
  return Ticket;
};