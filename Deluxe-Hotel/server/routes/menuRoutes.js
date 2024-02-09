const express = require("express");

const router = express.Router();

const menuController = require("../controllers/menuController");

router.get("/", menuController.getAllDataMenu);
router.get("/:id", menuController.getProductById);
router.delete("/:id", menuController.deleteProductById);
router.post("/", menuController.addNewProductById);

module.exports = router;
