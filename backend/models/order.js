const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  customer_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  purchase_amount: {
    type: Number,
    required: true,
  },
  total_amount: {
    type: Number,
    required: true,
  },
  order_status: {
    type: String,
    default: "pending",
  },
  order_date: {
    type: Date,
    default: Date.now,
  },
  additional_notes: {
    type: String,
  },
  delivery: {
    charges: {
      type: Number,
    },
    distance: {
      type: Number,
    },
    datetime: {
      type: Date,
      default: Date.now,
    },
  },
  items: [
    {
      item_id: {
        type: mongoose.Schema.Types.ObjectId,
      },
      quantity: {
        type: Number,
      },
    },
  ],
  payment: {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
    },
    payment_method: {
      type: String,
    },
    payment_amount: {
      type: Number,
    },
    paid_time: {
      type: Date,
    },
    payment_status: {
      type: String,
    },
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
