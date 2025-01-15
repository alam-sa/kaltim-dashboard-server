// JSON web token modules
const jwt = require('jsonwebtoken');

// Token secret key
const key = process.env.SECRET_KEY || "SECRET_KEY";

// Generate encoded token from payload
function sign(payload) {
  return jwt.sign(payload, key);
};

// Generate decoded payload from token
function verify(token) {
  return jwt.verify(token, key);
};

// Export modules
module.exports = {
  sign,
  verify
};