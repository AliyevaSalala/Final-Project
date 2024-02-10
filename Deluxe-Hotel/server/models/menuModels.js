const mongoose = require("mongoose");

const { Schema } = mongoose;

const menuSchema = new Schema({
  title: { type: String, required: true },
  menuCategory: { type: String, required: true },
  price: { type: Number, required: true },
  desc: { type: String, required: true },
  image: { type: String, required: true },
});

const Menu = mongoose.model("Menu", menuSchema);

module.exports = Menu;
