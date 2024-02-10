// controllers/authController.js

const User = require("../models/user");

exports.signup = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).send({ message: "Please fill in all fields" });
  }

  try {
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).send({
        message: "This email is already registered. Please use another email.",
      });
    }

    const newUser = new User({
      username: username,
      email: email,
      password: password,
    });

    await newUser.save();
    return res
      .status(201)
      .send({ message: "Your registration has been successfully created!" });
  } catch (error) {
    return res.status(500).send({ message: "An error occurred" });
  }
};

exports.signin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({ message: "Please enter email and password" });
  }

  try {
    const user = await User.findOne({ email: email, password: password });
    if (!user) {
      return res.status(400).send({ message: "Wrong email or password" });
    }

    return res.status(200).send({ message: "Login successful!" });
  } catch (error) {
    return res.status(500).send({ message: "An error occurred" });
  }
};
