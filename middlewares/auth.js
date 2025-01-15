'use-strict';

// JSON web token module
const {
  verify
} = require('../helpers/jwt');

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

// Export modules
module.exports = {
  authentication
};