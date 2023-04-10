const { Router } = require("express");
const { usuariosGet, usuariosPost, usuariosPut, usuariosDelete, usuariosNoFound } = require("../controllers/users");

const router = Router();

router.get('/',usuariosGet);

router.post('/',usuariosPost);

router.put('/:id',usuariosPut);

router.delete('/',usuariosDelete);

router.get("*", usuariosNoFound);

module.exports = router;
