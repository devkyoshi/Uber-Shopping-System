const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  branch_id: {
    type: String,
    ref: "Branch",
    required: true,
  },
  driver_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  driver_name: {
    type: String,
    ref: "User",
  },
  district: {
    type: String,
  },

  orders: [
    {
      order_id: {
        type: Schema.Types.ObjectId,
        ref: "Order",
      },
      order_ID: {
        type: String,
        ref: "Order",
      },
      status: {
        type: String,
      },
      pickup_image_url: {
        type: String,
      },
      pickedup_time: {
        type: Date,
      },
      delivered_image_url: {
        type: String,
      },
      delivered_time: {
        type: Date,
      },
    },
  ],
});

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
