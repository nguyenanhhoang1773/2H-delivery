const mongoose = require("mongoose");

const ShipperSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    default: "",
  },
  coordinates: {
    lat: Number,
    lng: Number,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
  lastActive: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Shipper", ShipperSchema);
