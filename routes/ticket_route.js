const router = require('express').Router();
const TicketController = require('../controllers/ticket_controller');

// Ticket Categories 
router.get('/categories', TicketController.getTicketCategories);
router.post('/categories/add', TicketController.addTicketCategories);

// Ticket Subcategories
router.get('/subcategories', TicketController.getTicketSubcategories);
router.post('/subcategories/add', TicketController.addTicketSubcategories);

router.post('/add', TicketController.addTicket);
router.patch('/edit/:ticketId', TicketController.editTicket);
router.get('/:ticketId', TicketController.getTickets);
module.exports = router;