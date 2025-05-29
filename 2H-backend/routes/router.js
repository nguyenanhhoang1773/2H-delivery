const express = require("express");
const router = express.Router();
const foodController = require("../controllers/foodController");
const userController = require("../controllers/userController");
const eateryController = require("../controllers/eateryController");
// router.get("/", foodController.getAllFoods);
router.post("/login", userController.login);
router.post("/addEatery", eateryController.addEatery);
module.exports = router;
