const { Router } = require("express");
const { search } = require("../controllers");



const router = Router();
router.get('/:colection/:element',search)


module.exports = router;  