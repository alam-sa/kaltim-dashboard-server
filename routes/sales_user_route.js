const router = require('express').Router();
const SalesUserController = require('../controllers/sales_user_controller');
const { authentication, superUserAuth } = require('../middlewares/auth');

router.post('/login', SalesUserController.login);
router.use(authentication);
router.get('/all', SalesUserController.getAllSalesUser);
router.post('/add', superUserAuth, SalesUserController.addNewSalesUser);
router.post('/edit/:id', superUserAuth, SalesUserController.editSalesUser);
router.delete('/delete/:id', superUserAuth, SalesUserController.deleteSalesUser);

module.exports = router;