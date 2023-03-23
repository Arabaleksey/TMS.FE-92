"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productController = void 0;
const product_model_1 = require("../models/product.model");
class ProductController {
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield product_model_1.ProductModel.find();
                return res.json(products);
            }
            catch (error) {
                return res.status(500).json(error.message);
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { title } = req.body;
                if (!title) {
                    return res.status(400).json({
                        message: "Title must be provided",
                    });
                }
                const product = new product_model_1.ProductModel({
                    title,
                });
                yield product.save();
                return res.json(product);
            }
            catch (error) {
                return res.status(500).json(error.message);
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { title, id } = req.body;
                if (!id || !title) {
                    return res.status(400).json({
                        message: "Title and id must be provided",
                    });
                }
                const product = yield product_model_1.ProductModel.findById(id);
                if (!product) {
                    return res.status(404).json({
                        message: "Product not found",
                    });
                }
                product.title = title;
                yield product.save();
                return res.json(product);
            }
            catch (error) { }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.query;
                yield product_model_1.ProductModel.findByIdAndDelete(id);
                return res.json("Deleted");
            }
            catch (error) {
                return res.status(500).json(error.message);
            }
        });
    }
}
exports.productController = new ProductController();
