'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TicketCategories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TicketCategories.belongsTo(models.Ticket, { foreignKey: 'category_id', targetKey: 'id' });
    }
  }
  TicketCategories.init({
    category_name: DataTypes.STRING,
    description: DataTypes.STRING,
    created_by: DataTypes.STRING,
    updated_by: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'TicketCategories',
    hooks: {
      beforeCreate: (ticketCategories, options) => {
        if (!ticketCategories.created_by) {
          ticketCategories.created_by = 'System';
        }
      },
      beforeUpdate: (ticketCategories, options) => {
        ticketCategories.created_by = ticketCategories._previousDataValues.created_by;
        if (!ticketCategories.updated_by) {
          ticketCategories.updated_by = 'System';
        }
      }
    }
  });
  return TicketCategories;
};