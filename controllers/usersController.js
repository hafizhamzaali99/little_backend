const users = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler");
const { tokenRemover } = require("../utils/tokenRemover");

exports.getAllUsers = async (req, res, next) => {
  try {
    const user_type = req.query.user_type;
    let usersData;
    if (user_type) {
      usersData = await users.find({ user_type });
    } else {
      usersData = await users.find();
    }
    usersData = tokenRemover(usersData);
    res.status(200).json({
      count:usersData.length,
      success: true,
      next:"",
      previous:"",
      results: usersData,
    });
  } catch (error) {
    return next(new ErrorHandler("Failed to fetch users", 500));
  }
};

exports.createUser = async (req, res, next) => {
  try {
    const userData = await users.create(req.body);
    res.status(201).json({
      success: true,
      message: "User created successfully",
      result: userData,
    });
  } catch (error) {
    return next(error);
    // return next(new ErrorHandler(error.message, 400));
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const usersData = await users.findOne({ email });
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
    let updatedObejct = tokenRemover(userData);
    res.status(200).json({
      success: true,
      result: updatedObejct,
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
    let updatedObejct = tokenRemover(updatedUser);
    res.status(200).json({
      success: true,
      message: "User udpated successfully",
      results: updatedObejct,
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
