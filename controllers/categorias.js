const { request, response, json } = require("express");
const { modelCategoria } = require("../models");

//Obtener categorias, paginado, total,populate en moongse(en vez del id tener la info del id)
//Obtner categoria solo una con id
//actualizar categoria, cambiar nombre y mirar que al que actualizan no exista
//Borrar categoria - > implica que cambie el status  a false

const categoriasGetID = async (req = request, res = response) => {
  const { id } = req.params;
  const categoria = await modelCategoria.findById(id).populate('user','name');

  return res.json(categoria);
};

const categoriasGet = async (req = request, res = response) => {
  const { limit = 5, desde = 0 } = req.query;
  const query = { status: true };

  if (isNaN(limit) || isNaN(desde)) {
    res.status(400).json({ msg: "Los parametro de filtro no son numericos." });
  }

  const [categorias, total] = await Promise.all([
    modelCategoria.find(query).populate('user','name').skip(Number(desde)).limit(Number(limit)),
    modelCategoria.countDocuments(query),
  ]);

  return res.json({
    total,
    categorias,
  });
};

const categoriasPut = async (req = request, res = response) => {

  const { id } = req.params;
  const { status,user, ...data } = req.body;
  data.name = data.name.toUpperCase();
  data.user = req.user._id;

  const CategoryUpdate = await modelCategoria.findByIdAndUpdate(id, data).populate('user','name');

  return res.json({
    msg: "Put Api", 
    CategoryUpdate,
  });
};

const categoriasPost = async (req = request, res = response) => {
  const name = req.body.name.toUpperCase();
  const categoriaDB = await modelCategoria.findOne({ name });
  if (categoriaDB) {
    return res.status(400).json({
      msg: `La categoria ${categoriaDB.name}, ya existe`,
    });
  }

  //Generar la data a guardar
  const data = {
    name,
    user: req.user._id,
  };

  const categoria = new modelCategoria(data);

  //Guardar en DB
  await categoria.save();

  return res.status(201).json(categoria);
};

const categoriasDelete = async(req = request, res = response) => {

  const { id } = req.params;
  //Actualizar el usuario con status a false
  const category = await modelCategoria.findByIdAndUpdate(id,{status:false},{new:true}).populate('user','name');
  
  if (!category.status) {
    return res.status(400).json({
      msg: `La categoria ${category.name}, ya se encuentra eliminada`,
    });
  }
  
  // const userAuth = req.user;
  return res.json({   
    category,
    // userAuth
  });
};

module.exports = {
  categoriasDelete,
  categoriasGet,
  categoriasGetID,
  categoriasPost,
  categoriasPut,
};
