const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  driver_id: {
    type: String,
    // Schema.Types.ObjectId,
    // ref: "Employee",
    // required: true,
  },
  task_status: {
    type: String,
    default: "ongoing",
  },
  route: {
    type: String,
  },
  orders: [
    {
      order_id: {
        type: 
        Schema.Types.ObjectId,
        ref: "Order",
        required: true,
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
