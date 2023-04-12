const { request } = require("express");
const jwt = require("jsonwebtoken");
const user = require("../models/user");
const validarJWT = async (req = request, res, next) => {
  const token = req.header("x-token");
  if (!token) {
    return res.status(400).json({
      msg: "No hay token en la peticion",
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
    const userAuth = await user.findById(uid);
    //Validar si el usuario existe
    if (!userAuth) {
      return res.status(400).json({
        msg: "Token no valido -User no existe",
      });
    }
    //Validar si el usuario no ha sido eliminado
    if (!userAuth.status) {
      return res.status(400).json({
        msg: "Token no valido -User en false",
      });
    }
    req.user = userAuth;
    next();
  } catch (error) {
    return res.status(400).json({
      msg: "Token no valido",
    });
  }
};

module.exports = { validarJWT };
