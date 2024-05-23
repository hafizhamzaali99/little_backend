const property = require("../models/propertyModel");
exports.createProperty = async (req, res, next) => {
  try {
    console.log(req.body, "Request body for creating user");
    const usersData = await property.create(req.body);
    console.log(usersData, "property created successfully");
    res.status(200).json({
      success: true,
      message: "property created successfully",
      data: usersData,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create property",
      error: error.message,
    });
  }
};
