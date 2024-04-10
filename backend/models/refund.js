const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const refundSchema = new Schema({
    order_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'// Reference to the Order model
    },
    complaint_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Complaint', // Reference to the Complaint model
        required: true
    },
    account_holder: {
        type: String,
        required: true
    },
    account_sort_code: {
        type: String,
        required: true
    },
    account_number: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    }
});

const Refund = mongoose.model("Refund", refundSchema);
module.exports = Refund;
