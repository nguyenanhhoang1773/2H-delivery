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

const getAllFoodOfEatery = async (req, res) => {
  try {
    const { EateryId } = req.query;
    console.log("eateryId:", EateryId);
    const foods = await Food.find({ EateryId });

    res.status(200).json(foods);
  } catch (error) {
    console.error("Lỗi khi lấy danh sách món ăn của quán:", error);
    res.status(500).json({ message: "Lỗi máy chủ" });
  }
};
module.exports = {
  addFood,
  getAllFoodOfEatery,
};
