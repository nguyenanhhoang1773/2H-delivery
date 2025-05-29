const Food = require("../models/Food");
const getAllFoods = (req, res) => {};
const addFood = async (req, res) => {
  try {
    const { name, description, price, imageUrl, category, available } =
      req.body;

    const newFood = new Food({
      name,
      description,
      price,
      imageUrl,
      category,
      available,
    });
    await newFood.save();
    res
      .status(201)
      .json({ message: "Food item created successfully", food: newFood });
  } catch (error) {
    console.error("Error adding food:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
module.exports = {
  addFood,
};
