const bcryptjs = require('bcryptjs');
const { errorHandler } = require('../utils/error');
const User = require('../models/user.model');

const test = (req, res) => {
  res.json({ message: 'API is working!' });
};

const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return next(errorHandler(403, 'You are not allowed to update this user'));
  }
  if (req.body.password) {
    if (req.body.password.length < 6) {
      return next(errorHandler(400, 'Password must be at least 6 characters'));
    }
    req.body.password = bcryptjs.hashSync(req.body.password, 10);
  }
  if (req.body.username) {
    if (req.body.username.length < 3 || req.body.username.length > 20) {
      return next(
        errorHandler(400, 'Username must be between 3 and 20 characters')
      );
    }
    if (req.body.username.includes(' ')) {
      return next(errorHandler(400, 'Username cannot contain spaces'));
    }
    if (req.body.username !== req.body.username.toLowerCase()) {
      return next(errorHandler(400, 'Username must be lowercase'));
    }
    if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
      return next(
        errorHandler(400, 'Username can only contain letters and numbers')
      );
    }
  }
  if (req.body.Emp_Name && (req.body.Emp_Name.length < 3 || req.body.Emp_Name.length > 50)) {
    return next(errorHandler(400, 'Employee name must be between 3 and 50 characters'));
  }
  if (req.body.Emp_Age && (isNaN(req.body.Emp_Age) || req.body.Emp_Age < 18 || req.body.Emp_Age > 100)) {
    return next(errorHandler(400, 'Employee age must be a number between 18 and 100'));
  }
  if (req.body.Emp_Gender && !['male', 'female', 'other'].includes(req.body.Emp_Gender.toLowerCase())) {
    return next(errorHandler(400, 'Employee gender must be "male", "female", or "other"'));
  }
  if (req.body.Emp_CNumber && (!/^\d{10}$/.test(req.body.Emp_CNumber))) {
    return next(errorHandler(400, 'Employee contact number must contain only 10 digits'));
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          Emp_Name: req.body.Emp_Name,
          Emp_CNumber: req.body.Emp_CNumber,
          Emp_Gender: req.body.Emp_Gender,
          Emp_Age: req.body.Emp_Age,
          Emp_areofservice: req.body.Emp_areofservice,
          Emp_transport: req.body.Emp_transport,
          password: req.body.password,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error); 
  }
};




const lvlupdateUser = async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return next(errorHandler(403, 'You are not allowed to update this user'));
  }

  try {
    
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          Emp_areofservice: req.body.Emp_areofservice,
          Emp_transport: req.body.Emp_transport,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error); 
  }
};

const deleteUser = async (req, res, next) => {
  if (!req.user.isAdmin && req.user.id !== req.params.userId) {
    return next(errorHandler(403, 'You are not allowed to delete this user'));
  }
  try {
    await User.findByIdAndDelete(req.params.userId);
    res.status(200).json('User has been deleted');
  } catch (error) {
    next(error);
  }
};

const signout = (req, res, next) => {
  try {
    res.clearCookie('access_token').status(200).json('User has been signed out');
  } catch (error) {
    next(error);
  }
};

const getUsers = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, 'You are not allowed to see all users'));
  }
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.sort === 'asc' ? 1 : -1;

    const users = await User.find()
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const usersWithoutPassword = users.map((user) => {
      const { password, ...rest } = user._doc;
      return rest;
    });

    const totalUsers = await User.countDocuments();

    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    const lastMonthUsers = await User.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({
      users: usersWithoutPassword,
      totalUsers,
      lastMonthUsers,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  test,
  updateUser,
  lvlupdateUser,
  deleteUser,
  signout,
  getUsers
};
