const { response, request } = require("express");
const user = require("../models/user");
const bcryptjs = require("bcryptjs");
const { generarJWT } = require("../helpers/generar-jwt");

const login = async (req = request, res = response) => {
  const { email, password } = req.body;

  try {
    //Verificar si el correo existe
    const usuario = await user.findOne({ email });
    if (usuario) {
      if (usuario.status === false) {
        return res.status(400).json({
          msg: "User / Password no son correctos. --Estado falso",
        });
      }
    } else {
      return res.status(400).json({
        msg: "User / Password no son correctos. ----Correo",
      });
    }

    // Verificar la contraseña
    const validPassword = bcryptjs.compareSync(password, usuario.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: "User / Password no son correctos. --contraseña",
      });
    }

    //Generar JWT
    const token = await generarJWT(usuario.id);

    return res.json({
      msg: "Login",
      token,
      usuario,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Hable con el administrador.",
    });
  }
};

module.exports = { login };
