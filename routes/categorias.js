const { Router, request, response } = require("express");
const {  validarCampos, validarJWT, adminRole } = require("../middlewares");
const { check } = require("express-validator");
const { categoriasPost, categoriasGet, categoriasGetID, categoriasPut, categoriasDelete } = require("../controllers/categorias");
const { existCategoriaById, existCategoryName } = require("../helpers/db-validators");

const router = Router();


//Obtener todas las categorias - publico
router.get('/',categoriasGet);
//Obtener todas las categorias por id - publico
router.get('/:id',[
    check("id", "No es un id valido").isMongoId(),
    check("id").custom(existCategoriaById),
    validarCampos
],categoriasGetID);
//crear categorias - privado cualquier persona con token valido
router.post('/',[
    validarJWT,
    check("user", "El user no es valido.").isMongoId(),
    check("name", "El nombre es obligatorio.").notEmpty(),
    check("name").custom(existCategoryName),
    validarCampos,
],categoriasPost);
//actualizar categorias - privado cualquier persona con token valido
router.put('/:id',[
    validarJWT,
    check("id", "No es un id valido").isMongoId(),
    check("id").custom(existCategoriaById),
    check("name").custom(existCategoryName),
    validarCampos,
],categoriasPut);
//borrar categorias - admin 
router.delete('/:id',[
    validarJWT,
    adminRole,
    check("id", "No es un id valido").isMongoId(),
    check("id").custom(existCategoriaById),
    validarCampos,
],categoriasDelete);


module.exports = router;
