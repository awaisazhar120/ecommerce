import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import formidable from "express-formidable";
import { createProductController, updateProductController } from "../controllers/productController.js";

const router = express.Router();

router.post("/create-product", requireSignIn, isAdmin, formidable(), createProductController);

router.put("/update-product/:id", requireSignIn, isAdmin, formidable(), updateProductController);

export default router;
