const { Area } = require('../models');
const { response } = require('../helpers/response');

class AreaController {
  static async addArea(req, res, next) {
    const { area_name, office_address } = req.body;
    try {
      await Area.create({
        area_name,
        office_address,
        created_by: req.currentUser?.full_name || 'unknown'
      });
      const responseCreated = response({ status: 201, message: 'Area created successfully' });
      res.status(201).json(responseCreated);
    } catch (err) {
      console.log(err);
      next(err);
    }
  };
  static async getAllArea(req, res, next) {
    try {
      const data = await Area.findAll({
        order: [['updatedAt', 'DESC']]
      });
      const responseSuccess = response({ status: 200, message: 'success', data:data });
      res.status(200).json(responseSuccess);
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
};

module.exports = AreaController;