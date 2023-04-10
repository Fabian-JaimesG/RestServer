const { response, request } = require("express");

const usuariosGet = (req = request, res = response) => {
  const { name = 'NA', tipo, dimension } = req.query;
  res.json({
    msg: "GET Api",
    name,
    tipo,
    dimension,
  });
};

const usuariosPost = (req = request, res = response) => {
  const { name, edad } = req.body;

  res.json({
    msg: "Post Api",
    name,
    edad,
  });
};

const usuariosPut = (req = request, res = response) => {
  const { id } = req.params;

  res.json({
    msg: "Put Api",
    id,
  });
};

const usuariosDelete = (req = request, res = response) => {
  res.json({
    msg: "Delete Api",
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
