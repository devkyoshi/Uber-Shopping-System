//IT22103840 Y.L.Jayasinghe customerschema

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerSchema = new Schema({
    cus_name: {
        type: String,
        required: true
    },
    cus_age: {
        type: Number,
        required: true
    },
    cus_email: {
        type: String,
        required: true
    },
    cus_gender: {
        type: String,
        required: true
    },
    cus_cnumber: {
        type: String,
        required: true
    },
    cus_username: {
        type: String,
        required: true
    },
    cus_password: {
        type: String,
        required: true
    },
    cus_address: {
        type: String,
        required: true
    },
    cus_lattidude: {
        type: String,
        default: "n/a"
    },
    cus_longtitude: {
        type: String,
        default: "n/a"
    },
    card: {
        account_number: {
            type: String
        },
        account_holder: {
            type: String
        },
        cvc: {
            type: Number
        }
    }
});

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;