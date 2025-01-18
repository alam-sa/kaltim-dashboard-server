const router = require('express').Router();
const { AdminRole } = require('../models');
const AdminRoleController = require('../controllers/admin_role_controller');
const { 
  validateAddAdminRole,
  validateEditAdminRole,
  validateDeleteAdminRole
} = require('../validations/admin_role_validation');

router.get('/', async (req, res, next) => {
	try {
		const data = await AdminRole.findAll({
			attributes: { exclude: ['createdAt', 'updatedAt'] }
		});
		res.status(200).json(data);
	} catch (err) {
		console.error(err);
		next(err);
	};
});
router.post('/add', AdminRoleController.addAdminRole);
router.post('/edit/:id', validateEditAdminRole, AdminRoleController.editAdminRole);
router.delete('/:id', validateDeleteAdminRole, AdminRoleController.deleteAdminRole);
router.get('/all', AdminRoleController.getAllAdminRole);


module.exports = router;