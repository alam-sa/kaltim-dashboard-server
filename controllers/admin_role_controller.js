const { response } = require('../helpers/response');
const { AdminRole } = require('../models')

class AdminRoleController {
  static async addAdminRole(req, res, next) {
    const { role_name, description } = req.body;
    try {
      await AdminRole.create({
        role_name: role_name,
        description: description,
        createdAt: new Date(),
        created_by: req.current_user?.full_name
      });
      const responseCreated = response({ status: 201, message: 'Admin role created successfully' });
      res.status(201).json(responseCreated);
    } catch (err) {
      console.log(err);
      
      next(err);
    };
  };
  static async editAdminRole(req, res, next) {
    const { role_name, description } = req.body;
    const { id } = req.params;
    try {
      
      const updatedData = await AdminRole.update({
        role_name,
        description,
        updated_by: req.current_user?.full_name || 'System'
      }, { where:{ id: +id} });
      
      const responseData = {};
      
      if (updatedData[0] === 1) {
        responseData.status = 201;
        responseData.message = `Admin role with ID ${id} updated successfully`;
      } else {
        // If the role was not found (no rows affected)
        responseData.status = 404;
        responseData.message = `Admin role with ID ${id} not found`;
      };

      const responseupdated = response(responseData);
      res.status(responseData.status).json(responseupdated);
    } catch (err) {
      console.log(err);
      next(err);
    };
  };
  static async deleteAdminRole(req, res, next) {
    const { id } = req.params;
    try {
      const deletedRole = await AdminRole.destroy({
        where: { id: +id }
      });
      
      const responseData = {};

      if (deletedRole) {
        responseData.status = 200;
        responseData.message = `Admin role with ID ${id} deleted successfully`;
      } else {
        // If the role was not found (no rows affected)
        responseData.status = 200;
        responseData.message = `Admin role with ID ${id} not found`;
      };
      const responseDeleted = response(responseData);
      res.status(responseData.status).json(responseDeleted);
    } catch (err) {
      next(err);
    };
  };
};

module.exports = AdminRoleController;