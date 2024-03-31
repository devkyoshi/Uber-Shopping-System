const mongoose = require('mongoose')


const RefundSchema = new mongoose.Schema({
    cus_id:{
        type:String,
        required:true,
        trim:true,
        maxLength:100
    },
    complaint_id:{
        type:String,
        required:true,
        trim:true,
        maxLength:100
    },
    order_id:{
        type:String,
        required:true,
        trim:true,
        maxLength:100
    },
    account_holder:{
        type:String,
        required:true,
        trim:true,
        maxLength:50
    },
    account_sort_code:{
        type:Number,
        required:true,
        trim:true,
    },
     account_number:{
        type:String,
        required:true,
        trim:true,
        maxLength:50
    },
    amount:{
        type:Number,  
        required:true, 
    }

},{timestamps:true})

module.exports = mongoose.model('Refund',RefundSchema)