const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const paymentSchema = new Schema({

    Payment_Amount:{
        type : Number,
        required: true
    },

    CVV:{
        type : Number,
        required: true
    },

    Payment_Date:{
        type : String,
        required: false
    },

    Payment_Method:{
        type : String,
        required: true
    },

    Paid_Time:{
        type : String,
        required: true
    },

    Account_Number:{
        type : String,
        required: true
    },

    Account_Holder:{
        type : String,
        required: true
    },

    Payment_Status:{
        type : String,
        required: true
    }
})

const Payment = mongoose.model("Payment", paymentSchema);
module.exports = Payment;