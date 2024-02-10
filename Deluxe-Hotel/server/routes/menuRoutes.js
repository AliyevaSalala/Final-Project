const express = require("express");

const router = express.Router();

const menuController = require("../controllers/menuController");

router.get("/", menuController.getAllDataMenu);
router.get("/:id", menuController.getProductById);
router.delete("/:id", menuController.deleteProductById);
router.post("/", menuController.addNewProductById);
router.patch("/:id", menuController.updateProductById);

module.exports = router;
