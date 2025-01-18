'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Area extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Area.hasMany(models.Ticket, { foreignKey: 'area_id' });
    }
  }
  Area.init({
    area_name: DataTypes.STRING,
    office_address: DataTypes.TEXT,
    created_by: DataTypes.STRING,
    updated_by: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Area',
    hooks: {
      beforeCreate: (area, options) => {
        if (!area.created_by) {
          area.created_by = 'System';
        }
      },
      beforeUpdate: (area, options) => {
        area.created_by = area._previousDataValues.created_by;
        if (!area.updated_by) {
          area.updated_by = 'System';
        }
      }
    }
  });
  return Area;
};