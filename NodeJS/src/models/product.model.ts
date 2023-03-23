import mongoose, { Model, Schema } from "mongoose";

interface IProduct {
  title: string;
  createdDate: number;
}

const productSchema: Schema<IProduct> = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  createdDate: {
    type: Number,
    default: Date.now(),
  },
});

export const ProductModel: Model<IProduct> = mongoose.model(
  "Product",
  productSchema
);
