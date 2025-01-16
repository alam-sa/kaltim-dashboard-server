function errorHandler(err, req, res, next) {
  const response = {};
  console.log(err.message);
  switch (err.name) {
    case 'SequelizeDatabaseError':
      response.statusCode = 400;
      response.message = err.message
      res.status(response.statusCode).json(response);
      break;
    case 'SequelizeValidationError':
      response.statusCode = 400;
      response.message = err.errors[0].message
      res.status(response.statusCode).json(response);
      break;
    case 'SequelizeUniqueConstraintError':
      response.statusCode = 400;
      response.message = err.errors[0].message
      res.status(response.statusCode).json(response);
      break;
    case 'BadRequest':
      response.statusCode = 400;
      response.message = err.message
      res.status(response.statusCode).json(response);
      break;
    case 'Unauthorized':
      response.statusCode = 401;
      response.message = err.message
      res.status(response.statusCode).json(response);
      break;
    case 'Forbidden':
      response.statusCode = 403;
      response.message = err.message
      res.status(response.statusCode).json(response);
      break;
    case 'NotFound':
      response.statusCode = 404;
      response.message = err.message
      res.status(response.statusCode).json(response);
      break;
    case 'DatabaseFailure':
      response.statusCode = 500;
      response.message = err.message
      res.status(response.statusCode).json(response);
      break;
    default:
      res.status(500).json({ message: 'Internal Server Error' })
      break;
  }
}

module.exports = errorHandler;