import { Request, Response } from "express";
import { ProductModel } from "../models/product.model";

class ProductController {
  async getAll(req: Request, res: Response) {
    try {
      const products = await ProductModel.find();

      return res.json(products);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  async create(req: Request<any, any, { title: string }>, res: Response) {
    try {
      const { title } = req.body;

      if (!title) {
        return res.status(400).json({
          message: "Title must be provided",
        });
      }

      const product = new ProductModel({
        title,
      });

      await product.save();

      return res.json(product);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  async update(
    req: Request<
      any,
      any,
      {
        title: string;
        id: string;
      }
    >,
    res: Response
  ) {
    try {
      const { title, id } = req.body;

      if (!id || !title) {
        return res.status(400).json({
          message: "Title and id must be provided",
        });
      }

      const product = await ProductModel.findById(id);

      if (!product) {
        return res.status(404).json({
          message: "Product not found",
        });
      }

      product.title = title;

      await product.save();

      return res.json(product);
    } catch (error) {}
  }

  async delete(req: Request<any, any, any, { id: string }>, res: Response) {
    try {
      const { id } = req.query;

      await ProductModel.findByIdAndDelete(id);

      return res.json("Deleted");
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

export const productController = new ProductController();
