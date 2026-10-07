import express from "express";
import products from "./data/products.js";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config();
connectDB(); // Connect to MongoDB

const port = process.env.PORT || 3001;

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.get("/api/products/:id", (req, res) => {
  const productId = req.params.id;
  const singleProduct = products.find((p) => p._id === productId);
  if (singleProduct) {
    res.json(singleProduct);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
