// models/Reservation.js
const mongoose = require("mongoose");

const { Schema } = mongoose;

const reservationSchema = new Schema({
  checkIn: Date,
  checkOut: Date,
  rooms: Number,
  guests: Number,
});

const Reservation = mongoose.model("Reservation", reservationSchema);

module.exports = Reservation;
