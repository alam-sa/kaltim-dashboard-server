const router = require('express').Router();
const AdminRoleController = require('../controllers/admin_role_controller');
const { 
  validateAddAdminRole,
  validateEditAdminRole,
  validateDeleteAdminRole
} = require('../validations/admin_role_validation');

router.post('/add', AdminRoleController.addAdminRole);
router.post('/edit/:id', validateEditAdminRole, AdminRoleController.editAdminRole);
router.delete('/:id', validateDeleteAdminRole, AdminRoleController.deleteAdminRole);


module.exports = router;