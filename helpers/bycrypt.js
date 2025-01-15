const bcrypt = require('bcryptjs');

function hashPassword(password) {
  return bcrypt.hashSync(password, 8);
};

function comparePassword(password, encrypted) {
  return bcrypt.compareSync(password, encrypted);
};

module.exports = { hashPassword, comparePassword };