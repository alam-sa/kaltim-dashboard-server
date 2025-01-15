'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Customer.init({
    customer_id: { type: DataTypes.STRING, unique: true },
    customer_name: { type: DataTypes.STRING, unique: true },
    phone_number: DataTypes.STRING,
    email: { type: DataTypes.STRING, unique: true },
    address: DataTypes.STRING,
    status: DataTypes.ENUM('pelanggan', 'calon pelanggan'),
    service_name: DataTypes.STRING,
    created_by: DataTypes.STRING,
    updated_by: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Customer',
  });
  return Customer;
};