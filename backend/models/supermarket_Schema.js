const mongoose = require('mongoose'); 

const Schema = mongoose.Schema;

const superMarketSchema = new Schema({

    SM_Name: {
        type : String,
        required: true
    },
    SM_Location:{
        type : String,
        required : true
    }
    // SM_Latitude: {
    //     type : String,
    //     required: true
    // },
    // SM_Longitude: {
    //     type : String,
    //     required: true
    // }
    
   
})

const SuperMarket = mongoose.model("Supermarket",superMarketSchema);
module.exports = SuperMarket;