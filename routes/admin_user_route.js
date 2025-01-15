const router = require('express').Router();
const AdminUserController = require('../controllers/admin_user_controller');
const { validateRegisterAdmin, validateLoginAdmin } = require('../validations/admin_user_validation');

router.post('/register',validateRegisterAdmin, AdminUserController.register);
router.post('/login', validateLoginAdmin, AdminUserController.login);


module.exports = router;