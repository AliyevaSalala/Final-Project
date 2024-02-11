// models/User.js

const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema({
  username: String,
  email: String,
  password: String,
  isAdmin: Boolean,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
