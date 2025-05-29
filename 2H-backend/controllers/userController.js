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

module.exports = {
  login,
};
