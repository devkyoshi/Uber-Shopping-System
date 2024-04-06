const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const complaintSchema = new Schema({
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
        type: Number,
        required: true
    },
    item_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required:true
    },
    resolving_option: {
        type: String,
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
        default: "pending"
    }
});

const Complaint = mongoose.model("Complaint", complaintSchema);
module.exports = Complaint;
