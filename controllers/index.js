const login  = require("../controllers/auth");
const googleSignIn  = require("../controllers/google");

module.exports = {
  ...login,
  ...googleSignIn,
};