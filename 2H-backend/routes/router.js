const express = require("express");
const router = express.Router();
const foodController = require("../controllers/foodController");
const userController = require("../controllers/userController");
router.get("/", foodController.getAllFoods);
router.post("/login", userController.login);

module.exports = router;
