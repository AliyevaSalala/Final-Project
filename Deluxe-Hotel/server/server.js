const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const productRouter = require("./routes/productRoutes.js");
const reservationRouter = require("./routes/reservationRoutes.js");
const menuRouter = require("./routes/menuRoutes.js");

require("dotenv").config();
const app = express();
const cors = require("cors");

// const DB = process.env.DB_URL;
// const PORT = process.env.PORT || 8000;
const PORT = 8000;
const DB_URL =
  "mongodb+srv://gd7l74l7n:selale123@cluster0.c5glouy.mongodb.net/";

app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use("/reservations", reservationRouter);
app.use("/menu", menuRouter);
app.use("/products", productRouter);
mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("connected to db succesfully");
    app.listen(PORT, () => {
      console.log(`Example app listening on port ${PORT}`);
    });
  })
  .catch((error) => console.log(error));
