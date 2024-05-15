const mongoose = require("mongoose");

const deliverySchema = new mongoose.Schema({
  chargePrice: {
    type: Number,
    required: true,
    default: 1,
  },
  deliveryFree: {
    type: Number,
    required: true,
    default: 1,
  },
  interest: {
    type: Number,
    required: true,
    default: 1,
  },
  order_count: {
    type: Number,
    required: true,
  },
});

const Delivery = mongoose.model("Delivery", deliverySchema);

module.exports = Delivery;
