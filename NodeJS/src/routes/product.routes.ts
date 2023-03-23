import express from "express";
import { productController } from "../controllers/product.controller";

const router = express.Router();

router.get("/product/all", productController.getAll);

router.post("/product/create", productController.create);

router.put("/product/update", productController.update);

router.delete("/product/delete", productController.delete);

export default router;
