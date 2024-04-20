const mongoose = require("mongoose")

const feedbackSchema = new mongoose.Schema({
    cus_feedback: {
        type: String,
        required: true,
    },
    cus_id: {
        type: String,
        required: true,
    },
    likes: {
        type: Array,
        default: [],
    },
    numberOfLikes: {
        type: Number,
        default: 0,
    },
    dislikes: {
        type: Array,
        default: [],
    },
    numberOfDislikes: {
        type: Number,
        default: 0,
    },
},{timestamps: true});

const Feedback = mongoose.model("Feedback",feedbackSchema);
module.exports = Feedback;