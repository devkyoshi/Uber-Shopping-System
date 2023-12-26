const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const paymentSchema = new Schema({

    customerID:{
        type : String,
        required: true
    },

    paymentStatus:{
        type : String,
        required: true
    },

    firstName:{
        type : String,
        required: true
    },

    lastName:{
        type : String,
        required: true
    },

    username:{
        type : String,
        required: true
    },

    email:{
        type : String,
        required: true
    },

    DeliveryAddress:{
        type : String,
        required: true
    },

    paymentType:{
        type : String,
        required: true
    },

    nameOnCard:{
        type : String,
        required: false
    },

    creditCardNumber:{
        type : String,
        required: false
    },

    expDate:{
        type : String,
        required: false
    },

    cvv:{
        type : String,
        required: false
    },

    total:{
        type : Number,
        required: true
    },

    paymentTimeStamp:{
        type : Date,
        required: true
    },

    paymentID:{
        type : String,
        required: true
    },

    
})

const Payment = mongoose.model("Payment", paymentSchema);
module.exports = Payment;