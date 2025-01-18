const { Op } = require('sequelize');
const generateTicketNumber = require('../helpers/generate_ticket_number');
const { response } = require('../helpers/response');
const { TicketCategories, TicketSubcategories, Ticket, Customer, Area } = require('../models');

class TicketController {
	static async getTicketCategories(req, res, next) {
		try {
			const data = await TicketCategories.findAll({
				attributes: { exclude: ['createdAt', 'updatedAt'] }
			});

			const responseSuccess = response({ status: 200, message: 'success', data: data });
			res.status(200).json(responseSuccess);
		} catch (err) {
			console.error(err);
			next(err);
		}	;
	};
	static async addTicketCategories(req, res, next) {
		const { category_name, description } = req.body;
		try {
			await TicketCategories.create({category_name, description});
			const responseSuccess = response({ status: 201, message: 'Ticket Category created successfully.' });
			res.status(201).json(responseSuccess);
		} catch (err) {
			console.error(err);
			next(err);
		};
	};
	static async getTicketSubcategories(req, res, next) {
		try {
			const data = await TicketSubcategories.findAll({
				attributes: { exclude: ['createdAt', 'updatedAt'] }
			});

			const responseSuccess = response({ status: 200, message: 'success', data: data });
			res.status(201).json(responseSuccess);
		} catch (err) {
			console.error(err);
			next(err);
		}	;
	};
	static async addTicketSubcategories(req, res, next) {
		const { subcategory_name, description } = req.body;
		try {
			await TicketSubcategories.create({subcategory_name, description});
			const responseSuccess = response({ status: 201, message: 'Ticket Subcategory created successfully.' });
			res.status(201).json(responseSuccess);
		} catch (err) {
			console.error(err);
			next(err);
		};
	};
  static async getTickets(req, res, next) {
    const { ticketId } = req.params;
    try {
      
    } catch (err) {
      console.error(err);
      next(err);
    };
  };
  static async addTicket(req, res, next) {
		const { area_id, customer_id, description, priority, category_id  } = req.body;
    try {
      const ticketNumber = await generateTicketNumber('Tickets');
			
			await Ticket.create({
				ticket_number: ticketNumber,
				description,
				status: 'new',
				priority: priority.toLowerCase(),
				category_id,
				area_id,
				customer_id,
				created_by: req.currentUser?.full_name || 'unknown',
			});
			const responseSuccess = response({ status: 201, message: 'Ticket created successfully.' });
			res.status(201).json(responseSuccess);
    } catch (err) {
      console.error(err);
      next(err);
    };
  };
  static async editTicket(req, res, next) {
    const { ticketId } = req.params;
    try {
      
    } catch (err) {
      console.error(err);
      next(err);
    };
  };
	static async getAllTickets(req, res, next) {
		const { search, status, priority, category_id, customer_id, area_id } = req.query;
    try {
			const condition = {};
			if (search) {
				condition.ticket_number = { [Op.iLike]: `%${search}%` };
			};
      // Add status condition (validating against enum values)
      if (status) {
        const validStatuses = ['new', 'on progress', 'completed', 'confirmed']; // Define valid enum values
        if (validStatuses.includes(status.toLowerCase())) {
          condition.status = status.toLowerCase(); // Ensure case-insensitivity
        } else {
          throw {
            name: 'BadRequest',
            message: 'Invalid status value'
          };
        };
      };

			if (priority) {
        const validpriority = ['low', 'medium', 'high']; // Define valid enum values
        if (validpriority.includes(priority.toLowerCase())) {
          condition.priority = priority.toLowerCase(); // Ensure case-insensitivity
        } else {
          throw {
            name: 'BadRequest',
            message: 'Invalid priority value'
          };
        };
      };

      // Add foreign key conditions for type_id and sales_id
      if (category_id) {
        if (!Number.isInteger(+category_id)) {
          throw {
            name: 'BadRequest',
            message: 'Invalid category_id value'
          };
        };
        condition.category_id = +category_id;
      };

      if (customer_id) {
        if (!Number.isInteger(+customer_id)) {
          throw {
            name: 'BadRequest',
            message: 'Invalid customer_id value'
          };
        };
        condition.customer_id = +customer_id;
      };

			if (area_id) {
        if (!Number.isInteger(+area_id)) {
          throw {
            name: 'BadRequest',
            message: 'Invalid area_id value'
          };
        };
        condition.area_id = +area_id;
      };

      const data = await Ticket.findAll({
				where: condition,
				include: [
					{ model: TicketCategories, attributes: ['category_name'] },
					{ model: TicketSubcategories, attributes: ['subcategory_name'] },
					{ model: Customer, attributes: {exclude: ['id', 'created_by', 'updated_by', 'createdAt', 'updatedAt', 'type_id'] } },
					{ model: Area, attributes: ['area_name', 'office_address'] }
				],
				order: [['updatedAt', 'DESC']]
			});
			
			const responseSuccess = response({ status: 200, message: 'success', data: data });
			res.status(200).json(responseSuccess);
    } catch (err) {
      console.error(err);
      next(err);
    };
  };
};

module.exports = TicketController;