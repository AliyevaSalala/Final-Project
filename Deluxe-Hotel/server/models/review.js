const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  reviewText: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
