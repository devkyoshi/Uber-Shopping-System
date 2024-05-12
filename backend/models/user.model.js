const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    Emp_Name: {
      type: String,
      required: true,
    },
    Emp_Age: {
      type: Number,
      required: true,
    },
    Emp_Gender: {
      type: String,
      required: true,
    },
    Emp_CNumber: {
      type: Number,
      required: true,
    },
    Emp_Address: {
      type: String,
      required: true,
    },
    profilePhoto: {
      type: String,
      default: "",
    },
    Emp_Level: {
      type: String,
      default: "Level 2",
    },
    Emp_type: {
      type: String,
      default: "available_employee",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    salary: {
      type: Number,
      default: 20000,
    },
    bonuses: {
      type: Number,
      default: 0,
    },
    benefits: {
      type: String,
      default: "none noob",
    },
    Emp_areofservice: {
      type: String,
      default: "Colombo",
    },
    Emp_transport: {
      type: String,
      default: "None",
    },
    Avg_rating: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;

/* 
  },
profilePicture: {
      type: String,
      default:
        'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },*/
