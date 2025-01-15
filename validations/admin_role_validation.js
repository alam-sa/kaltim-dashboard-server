'use-strict';

// Joi modules
const Joi = require('joi');

// Joi exception modules
const JoiException = require('../exceptions/joi_exception');

// Validate Admin Role
function validateAddAdminRole(request, response, next) {

  const schema = Joi.object(
    {
      role_name: Joi.string().max(30).min(3).required(),
      description: Joi.string()
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

// Validate Edit Admin Role
function validateEditAdminRole(request, response, next) {

  const paramsSchema = Joi.object({
    id: Joi.number().integer().min(1).required()
  });

  // Validation schema for request body (role_name and description)
  const bodySchema = Joi.object({
    role_name: Joi.string().max(30).min(3).required(),
    description: Joi.string().optional()
  });

  const { error: paramsError } = paramsSchema.validate({ id: +request.params.id });
  if (paramsError) throw new JoiException(error);

  const { error: bodyError } = bodySchema.validate(request.body, { allowUnknown: false });
  if (bodyError) throw new JoiException(error);

  next();

};


// Validate Delete Admin Role
function validateDeleteAdminRole(request, response, next) {

  const schema = Joi.object(
    {
      id: Joi.number().integer().min(1).required()
    }
  );

  const {
    error
  } = schema.validate(
    { id: +request.params.id },
    {
      allowUnknown: false
    }
  );

  if (error) throw new JoiException(error);

  next();

};

module.exports = {
  validateAddAdminRole,
  validateEditAdminRole,
  validateDeleteAdminRole
};