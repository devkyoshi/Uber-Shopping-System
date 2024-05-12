const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const { errorHandler } = require('../utils/error');
const jwt = require('jsonwebtoken');

const register = async (req, res, next) => {
    const { username, email, password, Emp_Name, Emp_Age, Emp_Gender, Emp_CNumber, Emp_Address ,profilePhoto,Emp_transport,Emp_areofservice} = req.body;

    // Check if any required field is missing or empty
    if (!username || !email || !password || !Emp_Name || !Emp_Age || !Emp_Gender || !Emp_CNumber || !Emp_Address ||!Emp_transport ||  username === '' || email === '' || password === '' || Emp_Name === '' || Emp_Age === '' || Emp_Gender === '' || Emp_CNumber === '' || Emp_Address === '') {
        next(errorHandler(400, 'All fields are required'));
    }

    const hashedPassword = bcrypt.hashSync(password,10);
    // Create user instance
    const newUser = new User({
        username,
        email,
        password : hashedPassword, 
        Emp_Name,
        Emp_Age,
        Emp_Gender,
        Emp_CNumber,
        profilePhoto,
        Emp_Address,
        Emp_transport,
        Emp_areofservice
    });
    
    try {
        // Save  user info to the database
        await newUser.save();

       
        res.json('Registration successful');
    } catch (error) {
        // error thing
        next(error);
    }
};

const signin = async (req, res, next) => {
    const { email, password } = req.body;
  
    if (!email || !password || email === '' || password === '') {
      next(errorHandler(400, 'All fields are required'));
    }
  
    try {
      const validUser = await User.findOne({ email });
      if (!validUser) {
        return next(errorHandler(404, 'User not found'));
      }
      const validPassword = bcrypt.compareSync(password, validUser.password);
      if (!validPassword) {
        return next(errorHandler(400, 'Invalid password'));
      }
      const token = jwt.sign(
        { id: validUser._id ,isAdmin:validUser.isAdmin},
        process.env.JWT_SECRET
      );

      const { password: pass, ...rest } = validUser._doc;
  
      res
        .status(200)
        .cookie('access_token', token, {
          httpOnly: true,
        })
        .json(rest);
    } catch (error) {
      next(error);
    }
};

module.exports = {
    register,
    signin
};
