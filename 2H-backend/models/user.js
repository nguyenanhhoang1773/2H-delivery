const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  address: {
    type: String,
  },
  favorites: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "eatery",
    },
  ],
  phone: {
    type: String,
  },

  lastLogin: {
    type: Date,
  },
});

module.exports = mongoose.model("user", UserSchema);
