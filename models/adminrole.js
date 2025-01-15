'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AdminRole extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      AdminRole.hasMany(models.AdminUser, { foreignKey: 'role_id' });
    }
  }
  AdminRole.init({
    role_name: DataTypes.STRING,
    description: DataTypes.STRING,
    created_by: DataTypes.STRING,
    updated_by: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'AdminRole',
    hooks: {
      beforeCreate: (adminRole, options) => {
        if (!adminRole.created_by) {
          adminRole.created_by = 'System';
        }
      },
      beforeUpdate: (adminRole, options) => {
        adminRole.created_by = adminRole._previousDataValues.created_by;
        if (!adminRole.updated_by) {
          adminRole.updated_by = 'System';
        }
      }
    }
  });
  return AdminRole;
};