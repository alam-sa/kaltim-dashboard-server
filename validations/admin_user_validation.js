'use-strict';

// Joi modules
const Joi = require('joi');

// Joi exception modules
const JoiException = require('../exceptions/joi_exception');

// Validate new Account Manager added
function validateRegisterAdmin(request, response, next) {

  const schema = Joi.object(
    {
      full_name: Joi.string().max(30).min(3).required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      phone_number: Joi.string().required(),
      role_id: Joi.number().required()
    }
  );

  const {
    error
  } = schema.validate(
    request.body,
    {
      allowUnknown: false
    }
  );

  if (error) throw new JoiException(error);

  next();

};

// Validate Login Admin
function validateLoginAdmin(request, response, next) {

  const schema = Joi.object(
    {
      email: Joi.string().email().required(),
      password: Joi.string().required()
    }
  );

  const {
    error
  } = schema.validate(
    request.body,
    {
      allowUnknown: false
    }
  );

  if (error) throw new JoiException(error);

  next();

};

module.exports = {
  validateRegisterAdmin,
  validateLoginAdmin
};