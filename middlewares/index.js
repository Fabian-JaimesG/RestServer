const adminRole = require("../middlewares/validar-roles");
const validarCamposUser = require("../middlewares/validarCampos");
const validarJWTUser = require("../middlewares/validar-jwt");

module.exports = {
  ...adminRole,
  ...validarJWTUser,
  ...validarCamposUser,
};
