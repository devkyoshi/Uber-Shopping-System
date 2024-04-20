const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// validation part
const comparisonSchema = new Schema({

  SM_Name: {type: String, required: true},
  price: {type: Number, required: true},
  quantity: {type: Number, required: true}

}) 

const Comparison = mongoose.model('Comparison', comparisonSchema);

module.exports = Comparison;
