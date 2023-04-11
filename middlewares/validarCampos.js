const { validationResult } = require("express-validator");

const validarCampos = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }
  next();
  //El next es el parametro en lo middlewares que da el paso al siguiente , cuando el proceso fue exitoso
};




module.exports = { validarCampos };
