const mongoose = require("mongoose");

const cashPaymentSchema = new mongoose.Schema({
  payment_method: {
    type: String,
    default: "cash",
  },
  email: {
    type: String,
    required: true,
  },
  payment_amount: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
  },
  postal_code: {
    type: Number,
  },
  paid_time: {
    type: Date,
    default: Date.now,
  },
  payment_status: {
    type: String,
    default: "Pending",
  },
  updated_time: {
    type: Date,
  },

  district: {
    type: String,
  },

  nearest_town: {
    type: String,
  },
});

const cardPaymentSchema = new mongoose.Schema({
  payment_method: {
    type: String,
    default: "card",
  },
  email: {
    type: String,
    required: true,
  },
  account_number: {
    type: String,
    required: true,
  },
  exp: {
    type: String,
    required: true,
  },
  cvc: {
    type: Number,
    required: true,
  },
  account_holder: {
    type: String,
    required: true,
  },
  payment_amount: {
    type: Number,
  },
  paid_time: {
    type: Date,
    default: Date.now,
  },
  payment_status: {
    type: String,
    default: "Paid",
  },
  updated_time: {
    type: Date,
  },

  district: {
    type: String,
  },

  nearest_town: {
    type: String,
  },
});

const orderSchema = new mongoose.Schema({
  order_ID: {
    type: String,
    required: true,
  },
  customer_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  purchase_amount: {
    type: Number,
    required: true,
  },
  order_district: {
    type: String,
  },
  total_amount: {
    type: Number,
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
  delivery: [
    {
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
  ],

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
  cash_payment: cashPaymentSchema,
  card_payment: cardPaymentSchema,
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
