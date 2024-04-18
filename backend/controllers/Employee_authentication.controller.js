const User = require('../models/user.model.js');
const bcrypt = require('bcrypt');
const { errorHandler } = require('../utils/error.js');
const jwt = require('jsonwebtoken');

exports.register = async (req, res, next) => {
    const { username, email, password, Emp_Name, Emp_Age, Emp_Gender, Emp_CNumber, Emp_Address ,profilePhoto,Emp_transport,Emp_areofservice} = req.body;

    // Check if any required field is missing or empty
    if (!username || !email || !password || !Emp_Name || !Emp_Age || !Emp_Gender || !Emp_CNumber || !Emp_Address ||!Emp_transport || !Emp_areofservice || username === '' || email === '' || password === '' || Emp_Name === '' || Emp_Age === '' || Emp_Gender === '' || Emp_CNumber === '' || Emp_Address === '') {
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

exports.signin = async (req, res, next) => {
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

// export const getSalaryAndBenefits = async (req, res) => {
//   try {
//     // Find the user by their ID (assuming you're passing the user ID in the request params)
//     const user = await User.findById(req.params.employeeId);

//     if (!user) {
//       return res.status(404).json({ message: 'Employee not found' });
//     }

//     // Extract salary, bonuses, and benefits from the user document
//     const { salary, bonuses, benefits } = user;

//     // Return the salary and benefits data
//     res.json({ salary, bonuses, benefits });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server Error' });
//   }
// };

// // Update salary and benefits for a specific user
// export const updateSalaryAndBenefits = async (req, res) => {
//     try {
//         // Find the user by their ID
//         const user = await User.findById(req.params.userId);

//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         // Update salary, bonuses, and benefits fields based on request body
//         user.salary = req.body.salary;
//         user.bonuses = req.body.bonuses;
//         user.benefits = req.body.benefits;

//         // Save the updated user document
//         await user.save();

//         // Return success message
//         res.json({ message: 'Salary and benefits updated successfully' });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Server Error' });
//     }
// };
  /* res
        .status(200)
        .cookie('access_token', token, {
          httpOnly: true,
        })
        .json(rest);
    } catch (error) {
      next(error);
    }*/

