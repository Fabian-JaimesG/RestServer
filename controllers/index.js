const login  = require("../controllers/auth");
const googleSignIn  = require("../controllers/google");
const search  = require("../controllers/search");

module.exports = {
  ...login,
  ...googleSignIn,
  ...search,
};