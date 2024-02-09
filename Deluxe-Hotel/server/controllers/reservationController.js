const Reservation = require("../models/reservation");

const getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find({});
    res.send(reservations).set(200);
  } catch (error) {
    // console.error("Error fetching reservations:", error);
    res.status(500).send({ message: error.message });
  }
};

const addNewRezervations = async (req, res) => {
  const newRezerv = new Rezervs({ ...req.body });
  try {
    await newRezerv.save();
    res.status(201).send({
      message: "created succesfully!",
      data: newRezerv,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = {
  getAllReservations,
  addNewRezervations,
};
