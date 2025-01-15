const { AdminUser } = require('../models');
const { response } = require('../helpers/response');

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
				created_at: new Date()
			});
			const responseSuccess = response({ status: 201, message: 'Registration successful! You are now registered as an admin user.' });
			res.status(200).json(responseSuccess);
		} catch (err) {
			next(err);
		};
	};

	static async login(req, res, next) {
		try {
			
		} catch (err) {
			next(err);
		};
	};
};

module.exports = AdminUserController;