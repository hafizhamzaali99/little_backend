const mongoose = require("mongoose");
const { generateToken } = require("../utils/auth");
const SALT_ROUNDS = 5;
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  team: {
    type: Object,
    default: null,
  },
  approved_jobs: {
    type: Array,
    default: null,
  },
  awaiting_approved: {
    type: Array,
    default: null,
  },
  pay_rate_users: {
    type: Array,
    default: null,
  },
  is_superuser: {
    type: Boolean,
    default: false,
  },
  is_active: {
    type: Boolean,
    default: true,
  },
  date_joined: {
    type: Date,
    default: Date.now,
  },
  username: {
    type: String,
    unique: true,
    sparse: true,
    required: true,
    maxlength: 50,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: function (value) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      },
      message: "Invalid email format",
    },
  },
  phone_number: {
    type: String,
    validate: {
      validator: function (value) {
        return /^\+?\d{1,3}[- ]?\d{3,}$/g.test(value);
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
  },
  street: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  zip: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  workers_comp_expiration: {
    type: Date,
    default: null,
  },
  deactivated: {
    type: Boolean,
    default: false,
  },
  discount: {
    type: Number,
    default: null,
  },
  password: {
    type: String,
    required: true,
  },
  decoded_password: {
    type: String,
  },
  user_type: {
    type: String,
    required: true,
    unique: true,
    enum: ["ADMIN", "CLIENT", "TECHNICIAN", "TEAM LEAD"],
  },
  attachments: {
    type: Array,
    default: null,
  },
  token: {
    type: String,
  },
});

userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) {
    // If password is not modified, only generate the token
    try {
      const generatedToken = await generateToken(user.toObject()); // Convert user to plain object
      user.token = generatedToken;
      next();
    } catch (error) {
      next(error); // Pass error to the next middleware
    }
    return;
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(user.password, SALT_ROUNDS);
    user.password = hashedPassword;
    const generatedToken = await generateToken(user.toObject()); // Convert user to plain object
    user.token = generatedToken;
    next();
  } catch (error) {
    next(error); // Pass error to the next middleware
  }
});

const userModel = mongoose.model("users", userSchema);
module.exports = userModel;
