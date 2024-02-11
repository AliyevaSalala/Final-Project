// routes/authRoutes.js

const express = require("express");
const router = express.Router();
const authController = require("../controllers/userController");

router.get("/users", authController.getAllUsers);
router.post("/signup", authController.signup);
router.post("/signin", authController.signin);

module.exports = router;
