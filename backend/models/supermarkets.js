//CRUD test => pass 31.03.24

const mongoose = require("mongoose");

const promotionSchema = new mongoose.Schema({
  promotion_name: {
    type: String,
  },
  discount_rate: {
    type: Number,
  },
  start_date: {
    type: String,
  },
  end_date: {
    type: String,
  },
  Items: [
    {
      item_type: {
        type: String,
      },
    },
  ],
});

const itemSchema = new mongoose.Schema({
  item_type: {
    type: String,
  },
  item_name: {
    type: String,
  },
  price: {
    type: Number,
  },
  available_quantity: {
    type: Number,
  },
  description: {
    type: String,
  },
  item_img: {
    type: String,
  },
});

//CRUD test => pass 31.03.24

const supermarketSchema = new mongoose.Schema({
  sm_name: {
    type: String,
    required: true,
  },
  sm_location: {
    type: String,
    default: "n/a",
  },
  sm_latitude: {
    type: String,
    default: "n/a",
  },
  sm_longitude: {
    type: String,
    default: "n/a",
  },
  items: [itemSchema], // Array of items

  promotions: [promotionSchema], // Array of promotions
});

const Supermarket = mongoose.model("Supermarket", supermarketSchema);

module.exports = Supermarket;
