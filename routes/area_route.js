const router = require('express').Router();
const AreaController = require('../controllers/area_controller');

router.get('/all',);
router.post('/', AreaController.addArea);
router.patch('/:id');
router.delete('/:id');

module.exports = router;