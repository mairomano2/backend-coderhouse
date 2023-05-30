const bcrypt = require("bcrypt");

const hashPassword = (password) => {
  const hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  return hash;
};

const isValidPassword = async (password, dbUser) => {
  return bcrypt.compare(password, dbUser)
};

module.exports = { hashPassword, isValidPassword };
