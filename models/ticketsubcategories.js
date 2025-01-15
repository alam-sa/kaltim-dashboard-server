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
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'TicketSubcategories',
  });
  return TicketSubcategories;
};