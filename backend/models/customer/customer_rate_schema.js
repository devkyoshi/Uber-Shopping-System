const mongoose = require("mongoose")

const rateSchema = new mongoose.Schema({
    cus_rating: {
        type: Number,
        required: true,
    },
    cus_id: {
        type: String,
        required: true,
    },
    emp_id: {
        type: String,
        required: true,
    },
},{timestamps: true})

const Rating = mongoose.model("Rating",rateSchema);
module.exports = Rating;