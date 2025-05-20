const express = require("express");
const { v4: uuidv4 } = require("uuid");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const router = require("./routes/router");
const app = express();
const port = 3000;
app.use(cors());
app.use(bodyParser.json());
app.use("/api", router);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://admin:144177@test.wldhh0t.mongodb.net/2H-Delivery?retryWrites=true&w=majority&appName=test"
    );
    console.log("MongoDB connected");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};
connectDB();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
