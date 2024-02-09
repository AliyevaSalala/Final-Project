const Menu = require("../models/menuModels");
// get All Products

const getAllDataMenu = async (req, res) => {
  try {
    const menus = await Menu.find({});
    res.send(menus).set(200);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// BY ID

const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const menu = await Menu.findById(id);
    res.send(menu).status(200);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

//   DELETE
const deleteProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedMenu = await Menu.findByIdAndDelete(id);
    const menus = await Menu.find({});
    res.status(200).json({
      message: "success",
      deletedMenu: deletedMenu,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// POST

const addNewProductById = async (req, res) => {
  const newMenu = new Menu({ ...req.body });
  try {
    await newMenu.save();
    res.status(201).send({
      message: "created succesfully!",
      data: newMenu,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = {
  getAllDataMenu,
  getProductById,
  deleteProductById,
  addNewProductById,
};
