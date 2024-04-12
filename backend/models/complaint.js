const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const complaintSchema = new Schema({
    customer_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true,
    },
    order_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required:true
    },
    payment_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required:true
    },
    complaint_type: {
        type: String,
        required: true
    },
    item_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required:true
    },
    resolving_option: {
        type: String,
        enum: ['refund', 'replacement'],
        required: true
    },
    complaint_img: {
        type: Buffer,
        required: true
    },
    quantity: {
        type: String,
        required: true
    },
    complaint_status: {
        type: String,
        enum: ['pending', 'accepted', 'resolved'],
        default: "pending"
    },
    updated_time: {
        type: Date,
        required: true,
    }
});

const Complaint = mongoose.model("Complaint", complaintSchema);
module.exports = Complaint;
