const { Router } = require("express");
const {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosDelete,
  usuariosNoFound,
} = require("../controllers/users");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validarCampos");
const {
  validationRol,
  validationExistEmail,
  existUserById,
} = require("../helpers/db-validators");

const router = Router();

router.get("/", usuariosGet);

router.post(
  "/",
  [
    check("name", "El nombre es obligatorio.").notEmpty(),
    check("email", "El correo no es valido.").isEmail(),
    check("password", "El password es obligatorio.").notEmpty(),
    check("password", "No cumple los parametros de clave.").isStrongPassword(),
    //Custom se utiliza para hacer validaciones personalizadas
    check("rol").custom(validationRol),
    check("email").custom(validationExistEmail),
    validarCampos,
  ],
  usuariosPost
);

router.put(
  "/:id",
  [
    check("id", "No es un id valido").isMongoId(),
    check("id").custom(existUserById),
    check("rol").custom(validationRol),
    validarCampos,
  ],
  usuariosPut
);

router.delete(
  "/:id",
  [
    check("id", "No es un id valido").isMongoId(),
    check("id").custom(existUserById),
    validarCampos,
  ],
  usuariosDelete
);

router.get("*", usuariosNoFound);

module.exports = router;
