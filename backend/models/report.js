const mongoose = require('mongoose')


const ReportSchema = new mongoose.Schema({
    driver_id:{
        type:String,
        required:true,
        trim:true,
        maxLength:100
    },
    market_name:{
        type:String,
        required:true,
        trim:true,
        maxLength:100
    },
    sm_location: {
        type: String,
        required:true,
        trim:true,
        
    },
    item_name: {
        type: String,
        required:true,
        trim:true,
        default: "n/a",
    },
    issue_type:{
        type:String,
        required:true,
        trim:true,
        maxLength:50
    },
     description:{
        type:String,
        required:true,
        trim:true,
        maxLength:50
    }

},{timestamps:true})

module.exports = mongoose.model('Report',ReportSchema)