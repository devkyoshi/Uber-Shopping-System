const mongoose = require("mongoose");

const deliverySchema = new mongoose.Schema({
  chargePrice: {
    type: Number,
    required: true,
  },
  deliveryFree: {
    type: Number,
    required: true,
  },
  interest: {
    type: Number,
    required: true,
  },
});

const Delivery = mongoose.model("Delivery", deliverySchema);

module.exports = Delivery;
