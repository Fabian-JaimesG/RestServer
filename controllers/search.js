const { response, request } = require("express");
const { SearchCategory, colectionsExist, SearchProduct, SearchUsers, searchProductByCategory } = require("../helpers/search");


const search = (req = request, res = response) => {
  const { colection, element } = req.params;

  if (!colectionsExist.includes(colection)) {
    return res.status(404).json({
      msg: `Las colecciones permitidas ${colectionsExist}.`,
    });
  }

  switch (colection) {
    case "categorias":
      SearchCategory(element, res);
      break;
    case "products":
      SearchProduct(element, res);
      break;
    case "usuarios":
      SearchUsers(element, res);
      break;
    case "categoryByProduct":
      searchProductByCategory(element, res);
      break;
    default:
      return res.status(500).json({
        msg: "Error Server",
      });
  }
};

module.exports = { search };
