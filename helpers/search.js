const { ObjectId } = require("mongoose").Types;
const { response } = require("express");
const { modelCategoria, modelProduct, modeluser } = require("../models");

const colectionsExist = ["categorias", "products", "roles", "usuarios","categoryByProduct"];

const SearchUsers = async (parameter = "", res = response) => {
  const isMongoID = ObjectId.isValid(parameter);
  if (isMongoID) {
    const userDB = await modeluser.find({ _id: parameter, status: true });
    return res.json({ results: userDB ? [userDB] : [] });
  }
  const regEx = new RegExp(parameter, "i");
  const [userDB, total] = await Promise.all([
    modeluser.find({ $or: [{ name: regEx }, { email: regEx }], status: true }),
    modeluser.countDocuments({
      $or: [{ name: regEx }, { email: regEx }],
      status: true,
    }),
  ]);
  return res.json({ total, results: userDB ? [userDB] : [] });
};

const SearchCategory = async (parameter = "", res = response) => {
  const isMongoID = ObjectId.isValid(parameter);
  if (isMongoID) {
    const category = await modelCategoria
      .find({ _id: parameter, status: true })
      .populate("user", "name");
    return res.json({ results: category ? [category] : [] });
  }
  const regEx = new RegExp(parameter, "i");
  const [category, total] = await Promise.all([
    modelCategoria.find({ name: regEx, status: true }).populate("user", "name"),
    modelCategoria.countDocuments({ name: regEx, status: true }),
  ]);
  return res.json({ total, results: category ? [category] : [] });
};

const SearchProduct = async (parameter = "", res = response) => {
  const isMongoID = ObjectId.isValid(parameter);
  if (isMongoID) {
    const product = await modelProduct
      .find({ _id: parameter, status: true })
      .populate("user", "name")
      .populate("category", "name");
    return res.json({ results: product ? [product] : [] });
  }
  const regEx = new RegExp(parameter, "i");
  const [product, total] = await Promise.all([
    modelProduct
      .find({ name: regEx, status: true })
      .populate("user", "name")
      .populate("category", "name"),
    modelProduct.countDocuments({ name: regEx, status: true }),
  ]);
  return res.json({
    total,
    results: product ? [product] : [],
  });
};

const searchProductByCategory = async (parameter = "", res = response) => {
  try {
    const isMongoID = ObjectId.isValid(parameter);
    console.log(isMongoID);

    if (isMongoID) {
    const [product, total] = await Promise.all([
            modelProduct.find({category:parameter,status: true}).populate("category", "name"),
            modelProduct.countDocuments({category:parameter,status: true}),
          ]);

      return res.json({total,
        results: product ? [product] : [],
      });
    }

    const regEx = new RegExp(parameter, "i");
    const categorys = await modelCategoria.find({ name: regEx, status: true });

    if (!categorys.length) {
      return res.status(400).json({
        msg: `No hay resultados para ${parameter}`,
      });
    }

    const [products, total] = await Promise.all([
        modelProduct.find({$or: [...categorys.map((category) => 
            ({category: category._id,})),],$and: [{ status: true }],})
            .populate("category", "name"),
        modelProduct.countDocuments({$or: [...categorys.map((category) => ({category: category._id,})),],$and: [{ status: true }],})
      ]);

    res.json({total,
      results: products,
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = {
  colectionsExist,
  SearchCategory,
  SearchProduct,
  searchProductByCategory,
  SearchUsers,
}