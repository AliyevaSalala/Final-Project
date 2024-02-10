const mongoose = require("mongoose");

const { Schema } = mongoose;

const productSchema = new Schema(
  {
    // room_number: { type: String, required: true },
    room_type: { type: String, required: true },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    desc: { type: String, required: true },
    image: { type: String, required: true },
  },
  { timestamps: true }
);

const Products = mongoose.model("Products", productSchema);

module.exports = Products;
