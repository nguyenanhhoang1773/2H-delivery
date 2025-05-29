const User = require("../models/user");
const login = async (req, res) => {
  const { email, fullname } = req.body;
  console.log(email, fullname);
  try {
    const user = await User.findOne({ email });
    if (!user) {
      const newUser = new User({
        email,
        name: fullname,
        address: "notUpdated",
        phone: "notUpdated",
        favorites: [],
        lastLogin: Date.now(),
      });
      await newUser.save();
      console.log("success");
      res.status(201).json({ user: newUser });
    } else {
      console.log("false");

      res.status(201).json({ user: user });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const getUserInfor = async (req, res) => {
  try {
    const { email } = req.query; // hoặc req.body tùy cách bạn gửi
    console.log("email:", email);

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
module.exports = {
  login,
  getUserInfor,
};
