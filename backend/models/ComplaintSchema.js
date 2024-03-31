const mongoose = require('mongoose')

const ComplaintSchema = new mongoose.Schema({
    cus_id:{
        type:String,
        required:true,
        trim:true,
        maxLength:10
    },
    complaint_type:{
        type:String,
        required:true,
        trim:true,
        maxLength:50
    },
    order_id:{
        type:String,
        required:true,
        trim:true,
        maxLength:100
    },
    resolving_option:{
        type:String,
        required:true,
        trim:true,
        maxLength:20
    },
     payment_id:{
        type:String,
        required:true,
        trim:true,
        maxLength:10
    },
    /*complaint_img:{
        type:Buffer,  
        required:true, 
    },*/
    quantity:{
        type:Number,
        required:true,
        trim:true
    },
    complaint_status:{
        type:String,
        required:true,
        trim:true,
        maxLength:10
    }

},{timestamps:true})

module.exports = mongoose.model('Complaint',ComplaintSchema)