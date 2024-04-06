let Customer = require("../models/customer_schema.js")
const bcrypt = require("bcrypt");
const { errorHandler } = require("../utils/error.js");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();



const register = async (req, res, next) => {
    const { Cus_Email,
            Cus_Username,
            Cus_Password,
            /*Cus_Name,
            Cus_Age,
            Cus_Gender,
            Cus_CNumber,
            Cus_Address,
            Cus_Latitude,
            Cus_Longtitude*/ } = req.body;
  
    if (!Cus_Email||
        !Cus_Username||
        !Cus_Password||
        /*!Cus_Name||
        !Cus_Age||
        !Cus_Gender||
        !Cus_CNumber||
        !Cus_Address||
        Cus_Name.trim() === ''||
        Cus_Age.trim() === ''||
        Cus_Gender.trim() === ''||
        Cus_CNumber.trim() === ''||
        Cus_Address.trim() === ''||*/
        Cus_Email.trim() === ''||
        Cus_Username.trim() === ''||
        Cus_Password.trim() === '') {
        return next(errorHandler(400,'All fields are required'));
    }

    const hashedPass = bcrypt.hashSync(Cus_Password,10)

    const newCustomer = new Customer({
        Cus_Email,
        Cus_Username,
        Cus_Password : hashedPass,
        /*Cus_Name,
        Cus_Age,
        Cus_Gender,
        Cus_CNumber,
        Cus_Address,
        Cus_Latitude,
        Cus_Longtitude*/
    });
    
    try {
        await newCustomer.save();
        res.json('Registration successful');
    } catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    const { Cus_Email, Cus_Password } = req.body;

    if(!Cus_Email || !Cus_Password || Cus_Password.trim() === '' || Cus_Email.trim() === ''){
        return next(errorHandler(400,'All fields are required'));
    }

        try{
            const validUser = await Customer.findOne({Cus_Email})

            if(!validUser){
                return next(errorHandler(404,'Wrong credentials'));
            }

            const validPass = bcrypt.compareSync(Cus_Password,validUser.Cus_Password);
            if(!validPass){
                return next(errorHandler(400,'Wrong credentials'));
            }

            const token = jwt.sign({id: validUser._id}, process.env.JWT_SECRET);

            const { Cus_Password: _, ...userData } = validUser._doc;

            res.status(200).cookie('access_token',token,{httpOnly: true})
            .json(userData);

        }catch (error) {
            next(error);
        }
};

/*const google = async (req, res, next) => {
    const {Cus_Username,Cus_Email,Cus_Photo} = req.body;
    try {
        const validUser = await Customer.findOne({Cus_Email});
        if(validUser){
            const token = jwt.sign({id: validUser._id}, process.env.JWT_SECRET);
            const { Cus_Password: _, ...userData } = validUser._doc;
            res.status(200).cookie('access_token', token. {
                httpOnly: true,
            }).json(userData);
        }
        else{
            const genPassword = Math.random().toString(36).
        }
    } catch (error) {
        next(error)
    }
}*/


module.exports = { register, login/*, google*/ };