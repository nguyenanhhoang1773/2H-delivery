const mongoose = require("mongoose");

const eaterySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  coordinates: {
    lat: Number,
    lng: Number,
  },
  phone: {
    type: String,
    default: "Not provided",
  },
  isOpen: {
    type: Boolean,
    default: true,
  },
  imageUrl: {
    type: String,
    default: "",
  },
  rating: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("eatery", eaterySchema);
