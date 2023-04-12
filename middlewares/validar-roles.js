const { response, request } = require("express")

const adminRole = (req = request,res = response,next) =>{

    if (!req.user) {
        return res.status(500).json({
            msg:'Se quiere verificar el rol sin autentica el jwt'
        })
    }

    const {rol,name} = req.user;

    if (rol !== 'ADMIN') {
        return res.status(400).json({
            msg:`${name} no es administrador.`
        })
    }

    next();

}

module.exports = {adminRole}