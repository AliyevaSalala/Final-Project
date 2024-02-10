// models/Reservation.js
const mongoose = require("mongoose");

const { Schema } = mongoose;

const reservationSchema = new Schema({
  checkIn: Date,
  checkOut: Date,
  rooms: String,
  guests: String,
});

const Reservation = mongoose.model("Reservation", reservationSchema);

module.exports = Reservation;
