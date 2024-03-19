const mongoose = require('mongoose'); 

const Schema = mongoose.Schema;

const promotionSchema = new Schema({

    discount_Rate: {
        type : String,
        required: true
    },
    Start_date:{
        type : String,
        required : true
    },
    End_date: {
        type : String,
        required: true
    }
   
    
   
})

const Promotion = mongoose.model("Promotion",promotionSchema);
module.exports = Promotion;