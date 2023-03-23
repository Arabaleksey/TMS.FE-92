"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("../controllers/product.controller");
const router = express_1.default.Router();
router.get("/product/all", product_controller_1.productController.getAll);
router.post("/product/create", product_controller_1.productController.create);
router.put("/product/update", product_controller_1.productController.update);
router.delete("/product/delete", product_controller_1.productController.delete);
exports.default = router;
