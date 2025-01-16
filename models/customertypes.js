'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CustomerTypes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CustomerTypes.hasMany(models.Customer, { foreignKey: 'type_id' });
    }
  }
  CustomerTypes.init({
    customer_type: {type: DataTypes.STRING, unique: true},
    description: DataTypes.STRING,
    created_by: DataTypes.STRING,
    updated_by: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'CustomerTypes',
    hooks: {
      beforeCreate: (customerType, options) => {
        if (!customerType.created_by) {
          customerType.created_by = 'System';
        }
      },
      beforeUpdate: (customerTypes, options) => {
        customerTypes.created_by = customerTypes._previousDataValues.created_by;
        if (!customerTypes.updated_by) {
          customerTypes.updated_by = 'System';
        }
      }
    }
  });
  return CustomerTypes;
};