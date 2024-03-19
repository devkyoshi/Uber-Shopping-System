const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const deliveryStatusSchema = new Schema({

   Task_status : {
        type: String ,
        required: true
    },

    DriverId: {
        type : String ,
        required: true
    },


    // Delivered_Time : {
    //     type : Number,
    //     required: true
    // },

    // Delivered_Image : {
    //     type : String ,
    //     required: true
    // },

    // PickUp_Time : {
    //     type : Number ,
    //     required: true
    // },

    // PickUp_Image: {
    //     type : String ,
    //     required: true
    // }


})

const DeliveryStatus = mongoose.model("task",deliveryStatusSchema);

module.exports = DeliveryStatus;