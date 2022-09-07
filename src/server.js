const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

const Order = require("../models/order.js");

mongoose.connect(process.env.DB_URL);

app.use(express.json());

//Method: GET
app.get("/orders", async (_, res) => {
  try {
    const orders = await Order.find({});
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Method: POST
app.post("/orders", async (req, res) => {
  try {
    const payload = req.body;
    const order = new Order(payload);
    await order.save();

    res.status(201).json({ message: "Success", order });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Method: UPDATE
app.put("/orders/:id", async (req, res) => {
  try {
    const payload = req.body;
    const { id } = req.params;

    await Order.findByIdAndUpdate(id, { $set: payload });
    res.status(200).json({ message: "Success", payload });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Method: DELETE
app.delete("/orders/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await Order.findByIdAndDelete(id);
    res
      .status(200)
      .json({ message: `The order with ${id} id has been deleted.` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Handling unexpected errors
mongoose.connection.on("error", (err) => {
  console.error("MongoDB error", err);
});

mongoose.connection.once("open", () => console.log("Connected to Database"));

app.listen(9000, () => {
  console.log("Application is running on port 9000");
});
