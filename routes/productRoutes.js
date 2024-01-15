import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import formidable from "express-formidable";
import { createProductController, deleteProductController, getAllProducts, getProductPhoto, getSingleProduct, productListWithPagination, updateProductController } from "../controllers/productController.js";

const router = express.Router();

router.post("/create-product", requireSignIn, isAdmin, formidable(), createProductController);

router.put("/update-product/:id", requireSignIn, isAdmin, formidable(), updateProductController);

router.get("/get-products",  getAllProducts);

router.get("/get-product/:id",  getSingleProduct);

router.get("/product-photo/:pid",getProductPhoto);

router.delete("/delete-product/:pid", deleteProductController);

router.get("/product-list",productListWithPagination);

export default router;
