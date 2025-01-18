const { SalesUser, sequelize } = require('../models');
const { response } = require('../helpers/response');
const { hashPassword, comparePassword } = require('../helpers/bycrypt');
const updateByColumns = require('../helpers/created_updated_by_global');
const { Op } = require('sequelize');
const { sign } = require('../helpers/jwt');

class SalesUserController {
  static async login(req, res, next) {
		const { email, password } = req.body;
		try {
			const userData = await SalesUser.findOne({
				where: { email: email },
				attributes: ['full_name', 'email', 'password']
			});
			if (!userData) throw {
				name: "BadRequest",
        message: "Incorrect username or password!"
			};
			const isPasswordMatch = comparePassword(password, userData.password);
			if (!isPasswordMatch) throw {
        name: "BadRequest",
        message: "Incorrect username or password!"
      };
			const access_token = sign({ full_name: userData.full_name, email: userData.email, user_type: 'sales' });
			const responseSuccess = response({ status: 200, message: 'Login successful!', data: { access_token } });
			res.status(200).json(responseSuccess);
		} catch (err) {
			console.log(err);
			next(err);
		};
	};

  static async getAllSalesUser(req, res, next) {
    const { search  } = req.query;
    try {
      let condition = search
      ? {
          [Op.or]: [
            { full_name: { [Op.iLike]: `%${search}%` } }, // Case-insensitive match for column1
            { email: { [Op.iLike]: `%${search}%` } }, // Case-insensitive match for column2
          ]
        }
      : {}; // If 'search' is undefined, no conditions are applied
      const data = await SalesUser.findAll({
        where: condition,
        attributes: { exclude: 'password' },
        order: [['updatedAt', 'DESC']]
      });
      const responseSuccess = response({ status: 200, message: 'success', data: data });
      res.status(200).json(responseSuccess);
    } catch (err) {
      console.error(err);
      next(err);
    };
  };
  static async addNewSalesUser(req, res, next) {
    const { full_name, email, password, phone_number } = req.body;
    try {
      await SalesUser.create({
        full_name,
        email,
        phone_number,
        password: hashPassword(password),
        created_by: req.currentUser?.full_name || 'unknown'
      });
      const responseSuccess = response({ status: 201, message: 'Add new Sales User successful!' });
			res.status(201).json(responseSuccess);
    } catch (err) {
      console.error(err);
      next(err);
    };
  };
  static async editSalesUser(req, res, next) {
    const { id } = req.params;
    const { full_name, email, password, phone_number } = req.body;
    const t = await sequelize.transaction();
    try {
      const salesUser = await SalesUser.findByPk(+id, { t });
      if (!salesUser) throw {
				name: 'NotFound',
				message: 'Sales user not found'
			};
			const oldFullname = salesUser.full_name;
      const payload = {};
      full_name ? payload.full_name = full_name : null;
      email ? payload.email = email : null;
      password ? payload.password = hashPassword(password) : null;
      phone_number ? payload.phone_number = phone_number : null;
      req.currentUser?.full_name ? payload.updated_by = req.currentUser.full_name : 'unknown';

      await SalesUser.update(payload, {
        where: { id: +id }, t
      });
      if (full_name && full_name !== oldFullname) {
				await updateByColumns(
					{ oldName: oldFullname, newName: full_name, columns: ['created_by', 'updated_by'] },
					t
				);
			}
	
			await t.commit();
      const responseSuccess = response({ status: 201, message: 'Update admin user successful!' });
			res.status(201).json(responseSuccess);
    } catch (err) {
      console.error(err);
      next(err);
    };
  };
  static async deleteSalesUser(req, res, next) {
    const { id } = req.params;
    try {
      const deletedUser = await SalesUser.destroy({
        where: { id: +id }
      });
      const responseData = {};
      if (deletedUser) {
        responseData.status = 200;
        responseData.message = `Sales User with ID ${id} deleted successfully`;
      } else {
        // If the role was not found (no rows affected)
        responseData.status = 200;
        responseData.message = `Sales User with ID ${id} not found`;
      };
      const responseDeleted = response(responseData);
      res.status(responseData.status).json(responseDeleted);
    } catch (err) {
      console.error(err);
      next(err);
    };
  };
};

module.exports = SalesUserController;