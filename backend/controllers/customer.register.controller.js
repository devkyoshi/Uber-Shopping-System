let Customer = require("../models/customer_register_schema.js")
const bcrypt = require("bcrypt");
const { errorHandler } = require("../utils/error.js");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();



const register = async (req, res, next) => {
    const { cus_email,
            cus_username,
            cus_password,
            /*cus_name,
            cus_age,
            cus_gender,
            cus_cnumber,
            cus_address,
            cus_latitude,
            cus_longtitude*/ } = req.body;
  
    if (!cus_email||
        !cus_username||
        !cus_password||
        /*!cus_name||
        !cus_age||
        !cus_gender||
        !cus_cnumber||
        !cus_address||
        cus_name.trim() === ''||
        cus_age.trim() === ''||
        cus_gender.trim() === ''||
        cus_cnumber.trim() === ''||
        cus_address.trim() === ''||*/
        cus_email.trim() === ''||
        cus_username.trim() === ''||
        cus_password.trim() === '') {
        return next(errorHandler(400,'All fields are required'));
    }

    const hashedPass = bcrypt.hashSync(cus_password,10)

    const newCustomer = new Customer({
        cus_email,
        cus_username,
        cus_password : hashedPass,
        /*cus_name,
        cus_age,
        cus_gender,
        cus_cnumber,
        cus_address,
        cus_latitude,
        cus_longtitude*/
    });
    
    try {
        await newCustomer.save();
        res.json('Registration successful');
    } catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    const { cus_email, cus_password } = req.body;

    if(!cus_email || !cus_password || cus_password.trim() === '' || cus_email.trim() === ''){
        return next(errorHandler(400,'All fields are required'));
    }

        try{
            const validUser = await Customer.findOne({cus_email})

            if(!validUser){
                return next(errorHandler(404,'Wrong credentials'));
            }

            const validPass = bcrypt.compareSync(cus_password,validUser.cus_password);
            if(!validPass){
                return next(errorHandler(400,'Wrong credentials'));
            }

            const token = jwt.sign({ id: validUser._id, adminType: validUser.adminType }, process.env.JWT_SECRET);

            const { cus_password: _, ...userData } = validUser._doc;

            res.status(200).cookie('access_token',token,{httpOnly: true})
            .json(userData);

        }catch (error) {
            next(error);
        }
};

const update = async(req, res, next) => {
    if(req.customer.id !== req.params.cus_ID){
        return next(errorHandler(403, 'You are not allowed to update this user'));
    }
    if(req.body.cus_password){
        if(req.body.cus_password.length < 6){
            return next(errorHandler(400, 'Password must be atleast 6 characters'));
        }
        req.body.cus_password = bcrypt.hashSync(req.body.cus_password, 10);
    }
    if(req.body.cus_username){
        if(req.body.cus_username.length < 5 || req.body.cus_username.length > 20){
            return next(errorHandler(400, 'Username must be between 5 and 20 characters'));
        }
        if(req.body.cus_username.includes(' ')){
            return next(errorHandler(400, 'Username cannot contain spaces'));
        }
        if(req.body.cus_username !== req.body.cus_username.toLowerCase()){
            return next(errorHandler(400, 'Username must be in lowercase'));
        }
        if(!req.body.cus_username.match(/^[a-zA-Z0-9]+$/)){
            return next(errorHandler(400, 'Username can only contain letters and numbers'));
        }
    }
    try {
        const updatedUser = await Customer.findByIdAndUpdate(req.params.cus_ID, {
            $set: {
                cus_email: req.body.cus_email,
                cus_username: req.body.cus_username,
                cus_password : req.body.cus_password,
                /*cus_name: req.body.cus_name,
                cus_age: req.body.cus_age,
                cus_gender: req.body.cus_gender,
                cus_cnumber: req.body.cus_cnumber,
                cus_address: req.body.cus_address,
                cus_latitude: req.body.cus_latitude,
                cus_longtitude: req.body.cus_longtitude,*/
            },
        }, { new: true });
        const { cus_password: _, ...userData } = updatedUser._doc;
        res.status(200).json(userData);
    } catch (error) {
            next(error);
    }
}

const deleteUser = async(req, res, next) => {
    if(req.customer.id !== req.params.cus_ID){
        return next(errorHandler(403, 'You are not allowed to delete this account'));
    }
    try {
        await Customer.findByIdAndDelete(req.params.cus_ID);
        res.status(200).json('Account has been removed');
    } catch (error) {
        next(error);
    }
}

const signout = (req,res,next) => {
    try{
        res.clearCookie('access_token').status(200).json('User has been signed out');
    }catch(error){
        next(error);
    }
};

module.exports = { register, login, update,deleteUser,signout };