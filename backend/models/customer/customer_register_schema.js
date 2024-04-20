const mongoose = require("mongoose")

const customerschema = new mongoose.Schema({
    cus_email:{
        type: String,
        required: true,
        unique: true,
    },

    cus_username:{
        type: String,
        required: true,
        unique: true,
    },

    cus_password:{
        type: String,
        required: true,
    },

    adminType: {
        type: String,
        default: 'null'
    },

    cus_name:{
        type: String,
        required: true,
    },

    cus_cnumber:{
        type: Number,
        required: true,
    },

    cus_gender:{
        type: String,
        required: true,
    },

    cus_age:{
        type: Number,
        required: true,
    },

    cus_address:{
        type: String,
        required: true,
    },

    cus_latitude:{
        type: Number,
        default: 0.00
    },

    cus_longtitude:{
        type: Number,
        default: 0.00
    }
},{timestamps: true});

const Customer = mongoose.model("Customer",customerschema)
module.exports = Customer;