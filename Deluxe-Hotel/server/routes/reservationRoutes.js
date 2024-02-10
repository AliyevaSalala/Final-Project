// routes/reservationRoutes.js

const express = require("express");
const router = express.Router();
const reservationController = require("../controllers/reservationController");

router.get("/", reservationController.getAllReservations);
router.post("/", reservationController.addNewRezervations);
router.delete("/:id", reservationController.deleteProductById);
router.patch("/:id", reservationController.updateProductById);

module.exports = router;
