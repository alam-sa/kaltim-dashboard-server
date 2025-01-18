'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SalesUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      SalesUser.hasMany(models.Customer, { foreignKey: 'sales_id' });
    }
  }
  SalesUser.init({
    full_name: { type: DataTypes.STRING, unique: true },
    phone_number: DataTypes.STRING,
    email: { type: DataTypes.STRING, unique: true },
    password: DataTypes.STRING,
    created_by: DataTypes.STRING,
    updated_by: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'SalesUser',
    hooks: {
      beforeCreate: (sales, options) => {
        if (!sales.created_by) {
          sales.created_by = 'System';
        }
      },
      beforeUpdate: (salesUser, options) => {
        salesUser.created_by = salesUser._previousDataValues.created_by;
        if (!salesUser.updated_by) {
          salesUser.updated_by = 'System';
        }
      }
    }
  });
  return SalesUser;
};