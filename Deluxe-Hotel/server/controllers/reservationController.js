const Reservation = require("../models/reservation");

const getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find({});
    res.send(reservations).status(200);
  } catch (error) {
    // console.error("Error fetching reservations:", error);
    res.status(500).send({ message: error.message });
  }
};

const addNewRezervations = async (req, res) => {
  const newRezerv = new Reservation({ ...req.body });
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

// BY ID

const getReservationById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Reservation.findById(id);
    res.send(product).status(200);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// DELETE

const deleteProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProduct = await Reservation.findByIdAndDelete(id);
    const products = await Reservation.find({});
    res.status(200).json({
      message: "success",
      deletedProduct: deletedProduct,
      allProducts: products,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const updateProductById = async (req, res) => {
  const { id } = req.params;
  try {
    await Reservation.findByIdAndUpdate(id, { ...req.body });
    const updatedProduct = await Reservation.findById(id);
    res.status(200).send({
      message: "updated succesfully!",
      data: updatedProduct,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = {
  getAllReservations,
  addNewRezervations,
  deleteProductById,
  updateProductById,
  getReservationById,
};
