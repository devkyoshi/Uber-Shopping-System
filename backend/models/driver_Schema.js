const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const driverSchema = new Schema({

    // Driver_Longtitude : {
    //     type: String ,
    //     required: true
    // },

    // Driver_Latitude : {
    //     type : String ,
    //     required: true
    // },


    current_handover_money : {
        type : Number,
        required: true
    },

    current_Location : {
        type : String ,
        required: true
    },

    Branch_ID : {
        type : String ,
        required: true
    },

    availability : {
        type : String ,
        required: true
    }
})

const Driver = mongoose.model("Driver",driverSchema);

module.exports = Driver;