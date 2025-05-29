const Eatery = require("../models/eatery");
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

module.exports = {
  addEatery,
};
