const mongoose = require("mongoose")

const customerschema = new mongoose.Schema({
    Cus_Email:{
        type: String,
        required: true,
        unique: true,
    },

    Cus_Username:{
        type: String,
        required: true,
        unique: true,
    },

    Cus_Password:{
        type: String,
        required: true,
    }

    /*Cus_Name:{
        type: String,
        required: true,
    },

    Cus_CNumber:{
        type: Number,
        required: true,
    },

    Cus_Gender:{
        type: String,
        required: true,
    },

    Cus_Age:{
        type: Number,
        required: true,
    },

    Cus_Address:{
        type: String,
        required: true,
    },

    Cus_Latitude:{
        type: Number,
    },

    Cus_Longtitude:{
        type: Number,
    }*/
},{timestamps: true});

/*customerschema.pre("save", async function (next) {
    if (!this.isNew) {
        next();
        return;
    }
    try {
        const Counter = require("./counter.js");
        const counter = await Counter.findByIdAndUpdate("customerId", {}, { upsert: true, new: true });

        if (!counter.sequence_value) {
            counter.sequence_value = 100000;
            await counter.save();
        }

        this.Cus_ID = counter.sequence_value++;
        await counter.save();
        
        next();
    } catch (error) {
        next(error);
    }
});*/


const Customer = mongoose.model("Customer",customerschema)
module.exports = Customer;