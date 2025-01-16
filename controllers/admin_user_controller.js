const { AdminUser } = require('../models');
const { response } = require('../helpers/response');
const { sign } = require('../helpers/jwt');

// Bcrypt password hashing modules
const {
  hashPassword,
  comparePassword
} = require('../helpers/bycrypt');

class AdminUserController {
	static async register(req, res, next) {
		const { full_name, phone_number, email, password, role_id } = req.body;
		try {
			await AdminUser.create({
				full_name,
				phone_number,
				email,
				password: hashPassword(password),
				role_id: role_id, 
				createdAt: new Date()
			});
			const responseSuccess = response({ status: 201, message: 'Registration successful! You are now registered as an admin user.' });
			res.status(201).json(responseSuccess);
		} catch (err) {
			console.log(err);
			next(err);
		};
	};

	static async login(req, res, next) {
		const { email, password } = req.body;
		try {
			const userData = await AdminUser.findOne({
				where: { email: email },
				attributes: ['full_name', 'email', 'password', 'role_id']
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
			const access_token = sign({ full_name: userData.full_name, email: userData.email, role_id: userData.role_id });
			const responseSuccess = response({ status: 200, message: 'Login successful!', data: { access_token } });
			res.status(200).json(responseSuccess);
		} catch (err) {
			console.log(err);
			next(err);
		};
	};

	static async addNewAdmin(req, res, next) {
		const { full_name, phone_number, email, password, role_id } = req.body;
		try {
			await AdminUser.create({
				full_name,
				phone_number,
				email,
				password: hashPassword(password),
				role_id: role_id, 
				created_by: req.currentUser?.full_name || 'unknown',
				createdAt: new Date()
			});
			const responseSuccess = response({ status: 201, message: 'Add new user successful!' });
			res.status(201).json(responseSuccess);
		} catch (err) {
			console.log(err);
			next(err);
		};
	};

	static async editAdmin(req, res, next) {
		const { full_name, phone_number, email, password, role_id } = req.body;
		const { id } = req.params;
		try {
			const payload = {};
			full_name ? payload.full_name = full_name : null;
			phone_number ? payload.phone_number = phone_number : null;
			email ? payload.email = email : null;
			role_id ? payload.role_id = role_id : null;
			req.currentUser?.full_name ? payload.updated_by = req.currentUser.full_name : 'unknown';
			await AdminUser.update(payload, {
				where: { id: id }
			});
			const responseSuccess = response({ status: 201, message: 'Update admin user successful!' });
			res.status(201).json(responseSuccess);
		} catch (err) {
			console.log(err);
			next(err);
		}
	}
	static async deleteAdmin(req, res, next) {
		const { id } = req.params;
		try {
			await AdminUser.destroy(id);
			const responseSuccess = response({ status: 201, message: 'Update admin user successful!' });
			res.status(201).json(responseSuccess);
		} catch (err) {
			console.log(err);
			next(err);
		}
	}
};

module.exports = AdminUserController;