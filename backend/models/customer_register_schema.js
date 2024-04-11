const mongoose = require("mongoose")

const customerschema = new mongoose.Schema({
    cus_email:{
        type: String,
        required: true,
        unique: true,
    },

    cus_username:{
        type: String,
        required: true,
        unique: true,
    },

    cus_password:{
        type: String,
        required: true,
    },

    isAdmin: {
        type: Boolean,
        default: false
    },

    /*cus_name:{
        type: String,
        required: true,
    },

    cus_cnumber:{
        type: Number,
        required: true,
    },

    cus_gender:{
        type: String,
        required: true,
    },

    cus_age:{
        type: Number,
        required: true,
    },

    cus_address:{
        type: String,
        required: true,
    },

    cus_latitude:{
        type: Number,
        default: 0.00
    },

    cus_longtitude:{
        type: Number,
        default: 0.00
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