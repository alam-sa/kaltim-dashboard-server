'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TicketSubcategories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TicketSubcategories.belongsTo(models.Ticket, { foreignKey: 'subcategory_id', targetKey: 'id' });
    }
  }
  TicketSubcategories.init({
    subcategory_name: DataTypes.STRING,
    description: DataTypes.STRING,
    created_by: DataTypes.STRING,
    updated_by: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'TicketSubcategories',
    hooks: {
      beforeCreate: (ticketSubcategories, options) => {
        if (!ticketSubcategories.created_by) {
          ticketSubcategories.created_by = 'System';
        }
      },
      beforeUpdate: (ticketSubcategories, options) => {
        ticketSubcategories.created_by = ticketSubcategories._previousDataValues.created_by;
        if (!ticketSubcategories.updated_by) {
          ticketSubcategories.updated_by = 'System';
        }
      }
    }
  });
  return TicketSubcategories;
};