const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// validation part
const orderSchema = new Schema({

  totalAmount: {type: Number, required: true},
  delivery_Charges: {type: Number, required: true},
  delivery_Distance: {type: Number, required: true},
  Order_status: {type: String, required: true},
  Delivery_DateTime: {type: Date, required: true},
  Additional_Notes: {type: String, required: true},
  quantity: {type: Number, required: true},
  Cus_ID: {type: String, required: true},
  payID: {type: String, required: true} 

}) // made a change over here - removed timestamp stuff

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;