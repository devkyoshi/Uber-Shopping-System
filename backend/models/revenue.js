const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const revenueSchema = new Schema({
  total_revenue: {
    type: Number,
    default: 0,
  },
  payments: [
    {
      payment_id: {
        type: Schema.Types.ObjectId,
      },
      time_stamp: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  refunds: [
    {
      refund_id: {
        type: Schema.Types.ObjectId,
        required: true,
      },
      time_stamp: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

const Revenue = mongoose.model("Revenue", revenueSchema);
module.exports = Revenue;
