const mongoose = require('mongoose');

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
      default: '',
    },
    Emp_Level: {
      type: String,
    },
    isAdmin:
    {
      type:Boolean,
      default:false
    }
   
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

module.exports = User;


/* profilePicture: {
      type: String,
      default:
        'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },*/