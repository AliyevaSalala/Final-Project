const express = require("express");
const reviewController = require("../controllers/reviewController");

const router = express.Router();

router.get("/", reviewController.getAllProducts);
router.delete("/:id", reviewController.deleteCommentById);
router.post("/submit", reviewController.submitReview);

module.exports = router;
