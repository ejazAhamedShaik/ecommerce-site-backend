import express from "express";
import {
  deleteProductById,
  getBigBillionProducts,
  getProducts,
  handleAddProduct,
  handleGetProductById,
  updateProductById,
} from "../controllers/productControllers.js";
import { isBodyEmpty } from "../utils/isBodyEmpty.js";

const productRouter = express.Router();

productRouter.get("/", getProducts);
productRouter.post("/", isBodyEmpty, handleAddProduct);
productRouter.get("/bigBillionProducts", getBigBillionProducts, getProducts);
productRouter.get("/:id", handleGetProductById);
productRouter.patch("/:id", isBodyEmpty, updateProductById);
productRouter.delete("/:id", deleteProductById);

export { productRouter };
