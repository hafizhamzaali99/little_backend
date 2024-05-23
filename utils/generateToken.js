const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv').config();


exports.generateToken = async (payload) => {
  if (
    typeof payload !== "object" ||
    payload === null ||
    Array.isArray(payload)
  ) {
    throw new Error("Payload must be a plain object");
  }
  const secretKey = process.env.SECRET_KEY
  console.log(secretKey, "secret key");
  return jwt.sign(payload, secretKey, { algorithm: "HS384", expiresIn: "3h" });
};
