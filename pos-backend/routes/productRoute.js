const express = require("express");
const { getProducts } = require("../controllers/productController");
const { isVerifiedUser } = require("../middlewares/tokenVerification")

const router = express.Router();

router.route("/").get(isVerifiedUser, getProducts)

module.exports = router;
