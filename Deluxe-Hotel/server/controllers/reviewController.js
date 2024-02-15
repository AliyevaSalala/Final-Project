const Review = require("../models/review");

const getAllProducts = async (req, res) => {
  try {
    const products = await Review.find({});
    res.send(products).status(200);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const submitReview = async (req, res) => {
  try {
    const { reviewText, name, email } = req.body;
    const review = new Review({ reviewText, name, email });
    await review.save();
    res.status(201).json({ message: "Review submitted successfully!" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

const deleteCommentById = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProduct = await Review.findByIdAndDelete(id);
    const products = await Review.find({});
    res.status(200).json({
      message: "success",
      deletedProduct: deletedProduct,
      allProducts: products,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = {
  deleteCommentById,
  getAllProducts,
  submitReview,
};
