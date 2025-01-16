const { Customer, CustomerTypes } = require('../models');
const { response } = require('../helpers/response');

class CustomerController {
  static async getAllCustomer(req, res, next) {
    try {
      const data = await Customer.findAll({
        include: [
          { model: CustomerTypes, attributes: ['customer_type'] }
        ]
      });
      const responseSuccess = response({ status: 200, message: 'success', data: data });
      res.status(200).json(responseSuccess);
    } catch (err) {
      console.log(err);
      next(err);
    }
  };
  static async getCustomerById(req, res, next) {
    const { id } = req.params;
    try {
      const data = await Customer.findByPk(id);
      const responseSuccess = response({ status: 200, message: 'success', data: data });
      res.status(200).json(responseSuccess);
    } catch (err) {
      console.log(err);
      next(err);
    }
  };
  static async addCustomer(req, res, next) {
    const {customer_id, customer_name, phone_number, email, address, status, service_name, type_id } = req.body;
    try {
      await Customer.create({
        customer_id,
        customer_name,
        phone_number,
        email,
        address,
        status: status.toLowerCase(),
        service_name,
        type_id,
        created_by: req.currentUser?.full_name || null
      });
      const responseSuccess = response({ status: 201, message: 'Customer data created successfully.' });
			res.status(201).json(responseSuccess);
    } catch (err) {
      console.log(err);
      next(err);
    }
  };
  static async editCustomer(req, res, next) {
    const {customer_id, customer_name, phone_number, email, address, status, service_name, type_id } = req.body;
    const { id } = req.params;
    try {
      const payload = {};
      customer_id ? payload.customer_id = customer_id : null;
      customer_name ? payload.customer_name = customer_name : null;
      phone_number ? payload.phone_number = phone_number : null;
      email ? payload.email = email : null;
      address ? payload.address = address : null;
      status ? payload.status = status.toLowerCase() : null;
      service_name ? payload.service_name = service_name : null;
      type_id ? payload.type_id = type_id : null;
      req.currentUser?.full_name ? payload.updated_by = req.currentUser.full_name : null;

      await Customer.update(payload, {
        where: { id: id }
      });
      const responseSuccess = response({ status: 201, message: 'Customer data updated successfully.' });
			res.status(201).json(responseSuccess);
    } catch (err) {
      console.log(err);
      next(err);
    }
  };
};

module.exports = CustomerController;