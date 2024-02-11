// controllers/authController.js

const User = require("../models/user");

const signup = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400).send({ message: "Please fill in all fields" });
  }

  try {
    const existingUser = await User.findOne({ email: email, username: username });
    if (existingUser) {
      res.status(400).send({
        message: "This email is already registered. Please use another email.",
      });
    }

    const newUser = new User({
      username: username,
      email: email,
      password: password,
    });

    await newUser.save();
    res
      .status(201)
      .send({ message: "Your registration has been successfully created!" });
  } catch (error) {
    res.status(500).send({ message: "An error occurred" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users).status(200);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const signin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).send({ message: "Please enter email and password" });
  }

  try {
    const user = await User.findOne({ email: email, password: password });
    if (!user) {
      res.status(400).send({ message: "Wrong email or password" });
    }

    res.status(200).send({ message: "Login successful!" });
  } catch (error) {
    res.status(500).send({ message: "An error occurred" });
  }
};

module.exports = {
  signup,
  signin,
  getAllUsers,
};
