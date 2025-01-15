'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AdminUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      AdminUser.belongsTo(models.AdminRole, { foreignKey: 'role_id', targetKey: 'id' });
    }
  }
  AdminUser.init({
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
    modelName: 'AdminUser',
    hooks: {
      beforeCreate: (adminUser, options) => {
        if (!adminUser.created_by) {
          adminUser.created_by = 'System';
        }
      },
      beforeUpdate: (adminUser, options) => {
        adminUser.created_by = adminUser._previousDataValues.created_by;
        if (!adminUser.updated_by) {
          adminUser.updated_by = 'System';
        }
      }
    }
  });
  return AdminUser;
};