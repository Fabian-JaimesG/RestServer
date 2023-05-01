const Rol = require("../models/role");
const {modeluser:user,modelCategoria} = require("../models");

//Se pone rol en vacio por defecto para que en dado caso de que no se envie del request choque con nuestra validacion
const validationRol = async (rol = "") => {
  const existeRol = await Rol.findOne({ rol });
  if (!existeRol)
    throw new Error(`El rol ${rol} no esta registrado en la base de datos.`);
};

const validationExistEmail = async (email = "") => {
  //Verificar si el correo existe
  const existEmail = await user.findOne({ email });
  if (existEmail)
    throw new Error(`El email ${email} ya se encuetra registrado.`);
};

const existUserById = async (id = "") => {
  //Verificar si existe el usuario con el id
  const existId = await user.findById(id);
  if (!existId) throw new Error(`El id ${id} no se encuetra registrado.`);
};

const existCategoriaById = async (id = "") => {
  //Verificar si existe la categoria con el id
  const existIdC = await modelCategoria.findById(id);
  if (!existIdC) throw new Error(`La categoria ${id} no se encuetra registrado.`);
};

const existCategoryName = async (name = "") => {
  const nameUpper = name.toUpperCase();
  const categoriaDB = await modelCategoria.findOne( {name:nameUpper} );
  if (categoriaDB) throw new Error(`La categoria ${categoriaDB.name}, ya existe`);
};

module.exports = {
  existCategoriaById,
  existUserById,
  validationExistEmail,
  validationRol,
  existCategoryName 
};
 