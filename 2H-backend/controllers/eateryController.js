const Eatery = require("../models/eatery");
const User = require("../models/user");
const addEatery = async (req, res) => {
  try {
    const { name, coordinates, phone, isOpen, imageUrl, rating } = req.body;

    const newEatery = new Eatery({
      name,
      coordinates,
      phone,
      isOpen,
      imageUrl,
      rating,
    });
    await newEatery.save();
    res
      .status(201)
      .json({ message: "Eatery created successfully", eatery: newEatery });
  } catch (error) {
    console.error("Error creating eatery:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAllEatery = async (req, res) => {
  try {
    const eateries = await Eatery.find();
    res.json(eateries);
  } catch (err) {
    console.error("Lỗi getAllEatery:", err);
    res.status(500).json({ error: "Lỗi server" });
  }
};
const addFavoriteEatery = async (req, res) => {
  try {
    const { userId, eateryId } = req.body;
    console.log("userId:", userId);
    console.log("eateryId:", eateryId);
    const user = await User.findById(userId);
    if (!user) return res.status(404).send("User not found");
    if (!user.favorites.includes(eateryId)) {
      user.favorites.push(eateryId);
      await user.save();
    }
    res
      .status(200)
      .json({ message: "Added to favorites", favorites: user.favorites });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getAllFavoriteEatery = async (req, res) => {
  try {
    const { userId } = req.query;

    const user = await User.findById(userId).populate("favorites");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user.favorites); // Trả về danh sách Eatery đã populate
  } catch (err) {
    console.error("Error getting favorite eateries:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
module.exports = {
  addEatery,
  getAllEatery,
  addFavoriteEatery,
  getAllFavoriteEatery,
};
