const router = require('express').Router();
const adminUserRoute = require('./admin_user_route');
const customerRoute = require('./customer_route');
const salesUserRoute = require('./sales_user_route');
const ticketRoute = require('./ticket_route');
const adminRoleRoute = require('./admin_role_route');
const { CustomerTypes } = require('../models');

// Admin Role
// router.get('/admin-role', async (req, res, next) => {
// 	try {
// 		const data = await AdminRole.findAll({
// 			attributes: { exclude: ['createdAt', 'updatedAt'] }
// 		});
// 		res.status(200).json(data);
// 	} catch (err) {
// 		console.error(err);
// 		next(err);
// 	};
// });

// Customer Types
router.get('/customer-type', async (req, res, next) => {
	try {
		const data = await CustomerTypes.findAll({
			attributes: { exclude: ['createdAt', 'updatedAt'] }
		});
		res.status(200).json(data);
	} catch (err) {
		console.error(err);
		next(err);
	};
});

router.post('/customer-type/add', async (req, res, next) => {
	const { type, description } = req.body;
	try {
		await CustomerTypes.create({type, description});
		res.status(201).json({message: 'Data Berhasil Disimpan!'})
	} catch (err) {
		console.error(err);
		next(err);
	}
});

router.use('/admin', adminUserRoute);
router.use('/customer', customerRoute);
router.use('/sales', salesUserRoute);
router.use('/ticket', ticketRoute);
router.use('/admin-role', adminRoleRoute);

module.exports = router;