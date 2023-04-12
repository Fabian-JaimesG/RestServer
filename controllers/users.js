const { response, request } = require("express");
const user = require("../models/user");
const { encryptPassword } = require("../helpers/bcrypt");

const usuariosGet = async (req = request, res = response) => {
  const { limit = 5, desde = 0 } = req.query;
  const query = { status: true };

  if (isNaN(limit) || isNaN(desde)) {
    res.status(400).json({ msg: "Los parametro de filtro no son numericos." });
  }
  const [users, total] = await Promise.all([
    user.find(query).skip(Number(desde)).limit(Number(limit)),
    user.countDocuments(query),
  ]);

  res.json({
    total,
    users,
  });
};

const usuariosPost = async (req = request, res = response) => {
  const { name, email, password, rol } = req.body;
  const User = new user({ name, email, password, rol });

  //Encriptar la contraseña
  User.password = encryptPassword(password);
  //Almacenar en base de datos
  await User.save();

  res.json(User);
};

const usuariosPut = async (req = request, res = response) => {
  const { id } = req.params;
  const { _id, password, google, email, ...resto } = req.body;
  //Todo validar contra base de datos
  if (password) {
    //Encriptar la contraseña
    resto.password = encryptPassword(password);
  }

  const usuario = await user.findByIdAndUpdate(id, resto);

  res.json({
    msg: "Put Api", 
    id,
    usuario,
  });
};

const usuariosDelete = async(req = request, res = response) => {

  const { id } = req.params;
  //Borra fisicamente el usuario de la bd
  // const usuario = await user.findByIdAndDelete(id);

  //Actualizar el usuario con status a false
  const usuario = await user.findByIdAndUpdate(id,{status:false});
  const userAuth = req.user;
  res.json({  
    usuario,
    userAuth
  });
};

const usuariosNoFound = (req = request, res = response) => {
  res.sendFile(path.resolve(__dirname + "/../public/html/404.html"));
};

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosDelete,
  usuariosNoFound,
};
