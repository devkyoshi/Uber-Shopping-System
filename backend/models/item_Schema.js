const mongoose = require('mongoose'); 

const Schema = mongoose.Schema;

const itemSchema = new Schema({

    Item_Name: {
        type : String,
        required: true
    },
    price:{
        type : Number,
        required : true
    },
    available_quantity: {
        type : Number,
        required: true
    },
    description: {
        type : String,
        required: true
    }
    
   
})

const Item = mongoose.model("Item",itemSchema);
module.exports = Item;