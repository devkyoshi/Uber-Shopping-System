// Mathota Arachchi S.S - IT22070876 - branch schema

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// driver.js
const driverSchema = new mongoose.Schema({
  driver_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  available_district: {
    type: String, 
  },
  current_handover_money: {
    type: Number, // Changed to Number for monetary values
    default: 0, // Changed default to 0
  },
  vehicle_number: {
    type: String,
  },
  availability: {
    type: String, // Consider using an enum if there are predefined availability statuses
  },
  // driver_longitude: {
  //     type: Number,  // Changed to Number
  // },
  // driver_latitude: {
  //     type: Number,  // Changed to Number
  //     default: 0  // Changed default to 0
  // }
});

const branchSchema = new mongoose.Schema({
  branch_ID: {
    type: String,
    required: true,
  },
  branch_name: {
    type: String,
    required: true,
  },
  branch_Location: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  // branch_Latitude: {
  //   type: String,
  // },
  // branch_Longitude: {
  //   type: String,
  // },
  drivers: [driverSchema],
});

const Branch = mongoose.model("Branch", branchSchema);
module.exports = Branch;
