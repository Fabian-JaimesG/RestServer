const user = require("../models/user");
const bcryptjs = require("bcryptjs");

const encryptPassword = (password) => {
  //Encriptar la contraseña
  const salt = bcryptjs.genSaltSync();
  return bcryptjs.hashSync(password, salt);
};

module.exports = { encryptPassword };
