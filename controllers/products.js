const { request, response, json } = require("express");
const { modelProduct } = require("../models");

const productPost = async (req = request, res = response) => {
  const nameU = req.body.name.toUpperCase();
  const { user, cost,name, ...rest } = req.body;
  const data = {
    name:nameU,
    ...rest,
    user: req.user._id,
  };
  const Product = new modelProduct(data);
  await Product.save();

  return res.json(Product);
};

const productGet = async (req = request, res = response) => {
  const { limit = 5, desde = 0 } = req.query;
  const query = { status: true }; 

  if (isNaN(limit) || isNaN(desde)) {
    res.status(400).json({ msg: "Los parametro de filtro no son numericos." });
  }
  const [products, total] = await Promise.all([
    modelProduct
      .find(query).skip(Number(desde)).limit(Number(limit))
      .populate("user", "name").populate("category", "name"),
    modelProduct.countDocuments(query),
  ]);

  res.json({
    total,
    products,
  });
};

const productGetID = async (req = request, res = response) => {
  const { id } = req.params;
  const product = await modelProduct
    .findById(id)
    .populate("user", "name")
    .populate("category", "name");

  return res.json(product);
};

const productPut = async (req = request, res = response) => {
  const { id } = req.params;
  const { status, user, ...data } = req.body;
  data.name = data.name.toUpperCase();

  const productUpdate = await modelProduct
    .findByIdAndUpdate(id, data)
    .populate("user", "name")
    .populate("category", "name");

  return res.json({
    msg: "Put Api",
    productUpdate,
  });
};

const productDelete = async (req = request, res = response) => {
  const { id } = req.params;
  //Actualizar el usuario con status a false
  const product = await modelProduct
    .findByIdAndUpdate(id, { status: false }, { new: true })
    .populate("user", "name")
    .populate("category", "name");

  if (!product.status) {
    return res.status(400).json({
      msg: `La categoria ${product.name}, ya se encuentra eliminada`,
    });
  }

  // const userAuth = req.user;
  return res.json({
    product,
  });
};

module.exports = {
  productDelete,
  productGet,
  productGetID,
  productPost,
  productPut,
};
