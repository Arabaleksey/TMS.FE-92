import express from "express";
import mongoose from "mongoose";
import path from "path";
import userRouter from "./routes/user.routes";
import productRouter from "./routes/product.routes";
import authRouter from "./routes/auth.routes";

require("dotenv").config();

const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Create Express app
const app = express();

app.use(express.json());

app.use(express.static(path.resolve(__dirname, "..", "public")));

app.use("/api", authRouter);
app.use("/api/", userRouter);
app.use("/api/", productRouter);

// Set up routes
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "..", "public", "index.html"));
});

// Start server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
