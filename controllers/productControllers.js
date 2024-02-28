import { Product } from "../models/productModel.js";
import {
  getAllFactory,
  createFactory,
  getElementByIdFactory,
  updateElementByIdFactory,
  deleteElementByIdFactory,
  getByQueryParamsFactory,
} from "../utils/crudFactory.js";

async function getBigBillionProducts(req, res, next) {
  req.query.filter = JSON.stringify({
    stock: { $lt: 10 },
    averageRating: { $gt: 4 },
  });
  next();
}

const getProducts = getByQueryParamsFactory(Product);
const handleGetProducts = getAllFactory(Product);
const handleAddProduct = createFactory(Product);
const handleGetProductById = getElementByIdFactory(Product);
const updateProductById = updateElementByIdFactory(Product);
const deleteProductById = deleteElementByIdFactory(Product);

export {
  getBigBillionProducts,
  getProducts,
  handleGetProducts,
  handleAddProduct,
  handleGetProductById,
  updateProductById,
  deleteProductById,
};
