const Rol = require("../models/role");
const user = require("../models/user");

//Se pone rol en vacio por defecto para que en dado caso de que no se envie del request choque con nuestra validacion
const validationRol = async(rol = '') => {
    const existeRol = await Rol.findOne({rol});
    if(!existeRol) throw new Error(`El rol ${rol} no esta registrado en la base de datos.`);
}

const validationExistEmail = async (email = '') => {
    //Verificar si el correo existe
    const existEmail = await user.findOne({ email });
    if(existEmail) throw new Error(`El email ${email} ya se encuetra registrado.`);
  };

  const existUserById = async (id = '') => {
    //Verificar si existe el usuario con el id 
    const existId = await user.findById(id);
    if(!existId) throw new Error(`El id ${id} no se encuetra registrado.`);
  };

module.exports = {validationRol,validationExistEmail,existUserById};
