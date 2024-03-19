const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    Emp_Name : {
        type : String,
        required : true
    },
    Emp_Age:{
        type : Number,
        required: true
    },
    
    Emp_Gender:{
        type : String,
        required: true
    },
    Emp_Username :{
        type : String,
        required : true
    },

    Emp_Password :{
        type : String,
        required : true
    }
    /*Emp_Level:{
        type : Number,
        required : true
    },

    
    Joined_Date :{
        type : Date,
        required : true
    },
   Emp_Email :{
        type : String,
        required : true
    },
    Emp_Type :{
        type : String,
        required : true
    },
    Emp_CNumber :{
        type : Number,
        required : true
    },

    

    Emp_Address :{
        type : String,
        required : true
    },

   */
})

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
