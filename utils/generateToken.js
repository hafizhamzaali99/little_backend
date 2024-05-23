const crypto = require("crypto");
const jwt = require("jsonwebtoken");

exports.generateToken = async (payload) => {
  // Check if payload is a plain object
  if (
    typeof payload !== "object" ||
    payload === null ||
    Array.isArray(payload)
  ) {
    throw new Error("Payload must be a plain object");
  }
  const secretKey = crypto.randomBytes(16).toString("hex");
  console.log(secretKey, "secret key");
  return jwt.sign(payload, secretKey, { algorithm: "HS384", expiresIn: "3h" });
};
