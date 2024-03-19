const mongoose = require('mongoose')


const RefundSchema = new mongoose.Schema({
    Refund_ID:{
        type:String,
        required:true,
        trim:true,
        maxLength:10
    },
    Order_ID:{
        type:String,
        required:true,
        trim:true,
        maxLength:10
    },
    Account_Holder:{
        type:String,
        required:true,
        trim:true,
        maxLength:50
    },
    Account_Sort_Code:{
        type:Number,
        required:true,
        trim:true,
    },
     Account_Number:{
        type:String,
        required:true,
        trim:true,
        maxLength:50
    },
    Amount:{
        type:Number,  
        required:true, 
    }

},{timestamps:true})

module.exports = mongoose.model('Refund',RefundSchema)