'use-strict';

// JSON web token module
const {
  verify
} = require('../helpers/jwt');

const { AdminUser } = require('../models');

// Middleware : User authentication
async function authentication(request, response, next) {

  // Destructuring access token from headers
  const {
    access_token
  } = request.headers;

  try {
    // Validate if access token is not present
    if (!access_token) throw {
      name: "Unauthorized",
      message: "Please login first!"
    };

    const decoded = verify(access_token);
    request.currentUser = decoded;
    
    // Pass to Controller if token is present
    next();

  } catch (error) {

    // Error log
    console.error(error, ">>> Error from User authentication");

    // Send error to error handler
    next(error);

  };

};

async function superUserAuth(request, response, next) {
  const {
    access_token
  } = request.headers;

  try {
    // Validate if access token is not present
    if (request.currentUser?.user_type !== 'admin') throw {
      name: "Unauthorized",
      message: "No access. Only super user admin can access!"
    };
    
    const dataAdmin = await AdminUser.findOne({
      where: { email: request.currentUser.email }
    });
    if (!dataAdmin || dataAdmin.role_id !== 1) throw {
      name: "Unauthorized",
      message: "No access. Only super user admin can access!"
    };
    
    // Pass to Controller if token is present
    next();

  } catch (error) {

    // Error log
    console.error(error, ">>> Error from Super User Validation");

    // Send error to error handler
    next(error);

  };
}

// Export modules
module.exports = {
  authentication,
  superUserAuth
};