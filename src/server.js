const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

const Order = require("../models/order.js");

mongoose.connect(process.env.DB_LINK, {
  useNewUrlParser: true,
});

app.use(express.json());

//Method: GET
app.get("/orders", async (_, res) => {
  const orders = await Order.find({});
  res.json(orders);
});

//Method: POST
app.post("/orders", async (req, res) => {
  const payload = req.body;
  const order = new Order(payload);
  await order.save();

  res.json(order);
  res.status(201).end();
});

//Handling unexpected errors
mongoose.connection.on("error", (err) => {
  console.error("MongoDB error", err);
});

app.listen(9000, () => {
  console.log("Application is running on port 9000");
});
