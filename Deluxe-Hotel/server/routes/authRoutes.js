// routes/authRoutes.js

const express = require("express");
const router = express.Router();
const authController = require("../controllers/userController");

router.get("/users", authController.getAllUsers);
router.post("/users", authController.addNewUsersById);
router.patch("/users/:id", authController.updateUsersById);
router.post("/signup", authController.signup);
router.delete("/users/:id", authController.deleteUsersById);
router.post("/signin", authController.signin);
router.post("/logout", authController.logout);

module.exports = router;
