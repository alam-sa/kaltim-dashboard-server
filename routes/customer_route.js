const router = require('express').Router();
const CustomerController = require('../controllers/customer_controller');
const { authentication } = require('../middlewares/auth');

router.use(authentication);
router.get('/all', CustomerController.getAllCustomer);
router.get('/:id', CustomerController.getCustomerById);
router.post('/add', CustomerController.addCustomer);
router.put('/edit/:id', CustomerController.editCustomer);

module.exports = router;