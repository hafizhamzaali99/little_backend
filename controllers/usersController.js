const users = require("../models/userModel");

exports.getAllUsers = async (req, res, next) => {
  try {
    const userType = req.query.user_type;
    console.log(userType, "userType");

    let usersData;
    if (userType) {
      usersData = await users.find({ user_type: userType });
    } else {
      usersData = await users.find();
    }

    res.status(200).json({
      success: true,
      results: usersData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch users",
    });
  }
};

exports.createUser = async (req, res, next) => {
  try {
    console.log(req.body, "Request body for creating user");
    const usersData = await users.create(req.body);
    console.log(usersData, "User data created successfully");
    res.status(200).json({
      success: true,
      message: "User created successfully",
      results: usersData,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create user",
      error: error.message, // Include error message in response
    });
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
    res.status(500).json({
      success: false,
      message: "Failed to fetch users",
    });
  }
};

exports.findUserById = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const userData = await users.findById({ _id: userId });
    if (!userData) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      result: userData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    // const userData = await users.findByIdAndUpdate(userId,req.body)
    const updatedUser = await users.findByIdAndUpdate(userId, req.body, {
      new: true,
      runValidators: true,
    });
    console.log(req.body, "patch data");
    res.status(200).json({
      success: true,
      message: "User udpated successfully",
      results: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: true,
      message: error.message,
    });
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
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
