const Product = require("../models/productModel");
const createHttpError = require("http-errors");

const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    next(createHttpError(500, "Error al obtener los productos."));
  }
};

module.exports = { getProducts };
