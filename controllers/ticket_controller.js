const { TicketCategories, TicketSubcategories } = require('../models');

class TicketController {
	static async getTicketCategories(req, res, next) {
		try {
			const data = await TicketCategories.findAll({
				attributes: { exclude: ['createdAt', 'updatedAt'] }
			});
			res.status(200).json(data);
		} catch (err) {
			console.error(err);
			next(err);
		}	;
	};
	static async addTicketCategories(req, res, next) {
		const { category_name, description } = req.body;
		try {
			await TicketCategories.create({category_name, description});
			res.status(201).json({message: 'Data Berhasil Disimpan!'})
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
			res.status(200).json(data);
		} catch (err) {
			console.error(err);
			next(err);
		}	;
	};
	static async addTicketSubcategories(req, res, next) {
		const { subcategory_name, description } = req.body;
		try {
			await TicketSubcategories.create({subcategory_name, description});
			res.status(201).json({message: 'Data Berhasil Disimpan!'})
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
    try {
      
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
};

module.exports = TicketController;