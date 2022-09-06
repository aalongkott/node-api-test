const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    name: String,
    origin: String,
    destination: String,
    price: Number,
  },
  { timestamps: true, versionKey: false }
);

const OrderModel = mongoose.model("Order", orderSchema, "orders");

module.exports = OrderModel;
