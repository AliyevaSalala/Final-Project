// console.log("backend");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { Schema } = mongoose;
const app = express();
const cors = require("cors");
const PORT = 8080;
const DB_URL =
  "mongodb+srv://gd7l74l7n:selale123@cluster0.c5glouy.mongodb.net/";

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("connected to db succesfully");
    app.listen(PORT, () => {
      console.log(`Example app listening on port ${PORT}`);
    });
  })
  .catch((error) => console.log(error));

const productSchema = new Schema({
  room_number: { type: String, required: true },
  room_type: { type: String, required: true },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  desc: { type: String, required: true },
  image: { type: String, required: true },
});

const Products = mongoose.model("Products", productSchema);

// get All Products

app.get("/products", async (req, res) => {
  try {
    const products = await Products.find({});
    res.send(products).set(200);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// BY ID

app.get("/products/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Products.findById(id);
    res.send(product).status(200);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

//   DELETE
app.delete("/products/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProduct = await Products.findByIdAndDelete(id);
    const products = await Products.find({});
    res.status(200).json({
      message: "success",
      deletedProduct: deletedProduct,
      allProducts: products,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// POST

app.post("/products", async (req, res) => {
  const newProduct = new Products({ ...req.body });
  try {
    await newProduct.save();
    res.status(201).send({
      message: "created succesfully!",
      data: newProduct,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
