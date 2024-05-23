const { default: mongoose } = require("mongoose");

const propertySchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
    required: true,
    default: 1, // Set the starting ID
  },
  images: {
    type: Array,
    default: [],
  },
  client_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: [true, "This field is required"],
  },
  lat: {
    type: Number,
    default: null,
  },
  lng: {
    type: Number,
    default: null,
  },
  sherwin_williams_account: {
    type: String,
    default: null,
  },
  sherwin_williams_store_email: {
    type: String,
    default: null,
  },
  name: {
    type: String,
    default: null,
    required: [true, "This field is required"],
  },
  street_name: {
    type: String,
    default: null,
    required: [true, "This field is required"],
  },
  city: {
    type: String,
    default: null,
    required: [true, "This field is required"],
  },
  state: {
    type: String,
    default: null,
    required: [true, "This field is required"],
  },
  zip: {
    type: String,
    default: null,
    required: [true, "This field is required"],
  },
  garage_code: {
    type: String,
    default: null,
  },
  manager_name: {
    type: String,
    default: null,
  },
  manager_contact_sms: {
    type: String,
    default: null,
    validate: {
      validator: function (value) {
        return /^\+?\d{1,3}[- ]?\d{3,}$/g.test(value);
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
  },
  manager_contact_email: {
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
  maintenance_name: {
    type: String,
    default: null,
  },
  maintenance_contact_sms: {
    type: String,
    default: null,
    validate: {
      validator: function (value) {
        return /^\+?\d{1,3}[- ]?\d{3,}$/g.test(value);
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
  },
  maintenance_contact_email: {
    type: String,
    default: null,
    validate: {
      validator: function (value) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      },
      message: "Invalid email format",
    },
  },
  property_username: {
    type: String,
    default: null,
  },
  property_password: {
    type: String,
    default: null,
  },
});

propertySchema.pre('save', function(next) {
    const property = this;
    if (property.isNew) {
        properties.findOne().sort('-_id').exec((err, lastUser) => {
        if (err) return next(err);
        user._id = lastUser ? lastUser._id + 1 : 1; // Increment the ID based on the last user's ID
        next();
      });
    } else {
      next();
    }
  });

const propertyModel = mongoose.model("properties", propertySchema);
module.exports = propertyModel;
