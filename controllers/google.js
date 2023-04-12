const { request, response, json } = require("express");
const { googleVerify } = require("../helpers/google-verify");
const user = require("../models/user");
const { generarJWT } = require("../helpers/generar-jwt");

const googleSignIn = async (req = request, res = response) => {
  const { id_token } = req.body;

  try {
    const {name,img,email} = await googleVerify(id_token);

    let usuario = await user.findOne({email});

    //Si usuario no existe , se crea
    if(!usuario){
        const data = {
            name,
            email,
            password:':P',
            rol:'USER',
            img,
            google:true,
        };

        // usuario = new user({name,email,password,rol,img,google});
        usuario = new user(data);
        await usuario.save();
    }

    //Si el usuario en BD esta en false
    if(!usuario.status){
        return res.status(401).json({
            ok: false,
            msg: "Hable con el admin, usuario bloqueado",
        })
    }

    //Generar JWT
    const token = await generarJWT(usuario.id);

    return res.json({
      msg: "Todo ok, google Sign In!",
      usuario,
      token
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      ok: false,
      msg: "El Token no se puede verificar",
    });
  }
};

module.exports = { googleSignIn };
