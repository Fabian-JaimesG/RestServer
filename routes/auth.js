const { Router, request, response } = require("express");
const { check } = require("express-validator");
const { login, googleSignIn } = require("../controllers");
const { validarCampos } = require("../middlewares/validarCampos");

const router = Router();

router.post(
  "/login",
  [
    check("email", "El correo no es valido.").isEmail(),
    check("password", "La contraseña es obligatoria.").notEmpty(),
    validarCampos,
  ],
  login
);

router.post(
  "/google",
  [
    check("id_token", "Token de google es necesario").notEmpty(),
    validarCampos,
  ],
  googleSignIn
);



module.exports = router;
