const users = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler");

exports.getAllUsers = async (req, res, next) => {
  try {
    const user_type = req.query.user_type;
    console.log(user_type, "userType");
    let usersData;
    if (user_type) {
      usersData = await users.find({ user_type });
    } else {
      usersData = await users.find();
    }
    res.status(200).json({
      success: true,
      results: usersData,
    });
  } catch (error) {
    return next(new ErrorHandler("Failed to fetch users", 500));
  }
};

exports.createUser = async (req, res, next) => {
  try {
    const usersData = await users.create(req.body);
    res.status(200).json({
      success: true,
      message: "User created successfully",
      results: usersData,
    });
  } catch (error) {
    return next(new ErrorHandler("Failed to create user", 500));
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const usersData = await users.findOne({ email });
    console.log(usersData, "single user data");
    res.status(200).json({
      success: true,
      results: usersData,
    });
  } catch (error) {
    return next(new ErrorHandler("Failed to fetch user", 500));
  }
};

exports.findUserById = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const userData = await users.findById({ _id: userId });
    if (!userData) {
      return next(new ErrorHandler("User not found", 404));
    }
    res.status(200).json({
      success: true,
      result: userData,
    });
  } catch (error) {
    return next(new ErrorHandler("Failed to fetch user", 500));
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const updatedUser = await users.findByIdAndUpdate(userId, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      success: true,
      message: "User udpated successfully",
      results: updatedUser,
    });
  } catch (error) {
    return next(new ErrorHandler("Failed to update user", 500));
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const userData = await users.findByIdAndDelete({ _id: userId });
    if (!userData) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    return next(new ErrorHandler("Failed to delete user", 500));
  }
};
