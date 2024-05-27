const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const ErrorHandler = require("./errorHandler");
const dotenv = require("dotenv").config();
const secretKey = process.env.SECRET_KEY;

exports.generateToken = async (payload) => {
  if (
    typeof payload !== "object" ||
    payload === null ||
    Array.isArray(payload)
  ) {
    throw new Error("Payload must be a plain object");
  }
  return jwt.sign(payload, secretKey, { algorithm: "HS384", expiresIn: "3h" });
};

exports.verifyToken = async (req, res, next) => {
  try {
    const token = req?.header("Authorization")?.split(" ")[1];
    if (!token) {
      return next(new ErrorHandler("No token found. Authorization failed!", 401));
    }
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (error) {
    return next(new ErrorHandler("Invalid token", 401));
  }
};
