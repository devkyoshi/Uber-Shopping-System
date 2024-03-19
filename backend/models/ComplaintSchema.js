const mongoose = require('mongoose')

const ComplaintSchema = new mongoose.Schema({
    complaint_type:{
        type:String,
        required:true,
        trim:true,
        maxLength:50
    },
    Order_ID:{
        type:String,
        required:true,
        trim:true,
        maxLength:10
    },
    Resolving_option:{
        type:String,
        required:true,
        trim:true,
        maxLength:20
    },
     Payment_ID:{
        type:String,
        required:true,
        trim:true,
        maxLength:10
    },
    /*Complaint_image:{
        type:Buffer,  
        required:true, 
    },*/
    Quantity:{
        type:Number,
        required:true,
        trim:true
    },
    Complaint_Status:{
        type:String,
        required:true,
        trim:true,
        maxLength:10
    }

},{timestamps:true})

module.exports = mongoose.model('Complaint',ComplaintSchema)