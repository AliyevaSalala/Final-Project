const Reservation = require("../models/reservation");

// const createReservation = async (req, res) => {
//   try {
//     const { checkIn, checkOut } = req.body;
//     const existingReservation = await Reservation.findOne({
//       $or: [
//         { checkIn: { $lte: checkIn }, checkOut: { $gte: checkIn } },
//         { checkIn: { $lte: checkOut }, checkOut: { $gte: checkOut } },
//       ],
//     });

//     if (existingReservation) {
//       return res
//         .status(400)
//         .json({
//           message: "Bu tarihler arasında başka bir rezervasyon bulunmaktadır.",
//         });
//     }

//     const newReservation = new Reservation(req.body);
//     await newReservation.save();
//     res.status(201).json({ message: "Rezervasyon başarıyla oluşturuldu." });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Bir hata oluştu." });
//   }
// };

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
};
