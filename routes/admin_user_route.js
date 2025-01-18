const router = require('express').Router();
const AdminUserController = require('../controllers/admin_user_controller');
const { authentication } = require('../middlewares/auth');
const { validateRegisterAdmin, validateLoginAdmin } = require('../validations/admin_user_validation');

router.post('/register',validateRegisterAdmin, AdminUserController.register);
router.post('/login', validateLoginAdmin, AdminUserController.login);
router.use(authentication);
router.get('/all', AdminUserController.getAllAdmin);
router.post('/add', validateRegisterAdmin, AdminUserController.addNewAdmin);
router.put('/edit/:id', AdminUserController.editAdmin);
router.delete('/delete/:id', AdminUserController.deleteAdmin);


module.exports = router;