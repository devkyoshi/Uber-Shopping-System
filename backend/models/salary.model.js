const mongoose = require('mongoose');

const salarySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    amount: {
        type: Number,
        default: 10000
    },
    bonus: {
        type: Number,
        default: 0
    },
    penalties: {
        type: String,
        default: 'none'
    }
}, { timestamps: true });

const Salary = mongoose.model('Salary', salarySchema);

module.exports = Salary;

