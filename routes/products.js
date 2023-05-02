const { Router, request, response } = require("express");
const {  validarCampos, validarJWT, adminRole } = require("../middlewares");
const { check } = require("express-validator");
const { productGet, productPost, productGetID, productPut, productDelete } = require("../controllers/products");
const { existUserById, existProductByName, existProductById,existCategoriaById } = require("../helpers/db-validators");

const router = Router();

router.get('/',productGet);

router.get('/:id',[
    check("id", "No es un id valido").isMongoId(),
    check("id").custom(existProductById), 
    validarCampos
],productGetID);

//crear pruductos - privado cualquier persona con token valido
router.post('/',
[   validarJWT,
    check("name", "El nombre es obligatorio.").notEmpty(),
    check("name").custom(existProductByName),
    check("cost", "El precio no es valido.").isDecimal(),
    check("category", "La categoria tiene que ser un id de mongo valido.").isMongoId(),
    check("category").custom(existCategoriaById),
    validarCampos,
],
productPost);
//actualizar categorias - privado cualquier persona con token valido
router.put('/:id',
[   validarJWT,
    check("id", "No es un id valido").isMongoId(),
    check("id").custom(existProductById),
    validarCampos,
],
productPut);
//borrar categorias - admin 
router.delete('/:id',[
    validarJWT,
    adminRole,
    check("id", "No es un id valido").isMongoId(),
    check("id").custom(existProductById),
    validarCampos,
],productDelete);


module.exports = router;
