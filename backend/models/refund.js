const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const refundSchema = new Schema({
    order_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
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
