const express = require("express");

const router = express.Router();

const productController = require("../controllers/productController");

router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);
router.delete("/:id", productController.deleteProductById);
router.post("/", productController.addNewProductById);
router.patch("/:id", productController.updateProductById);

module.exports = router;
