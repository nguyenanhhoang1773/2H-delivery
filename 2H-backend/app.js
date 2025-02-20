const express = require("express");
const { v4: uuidv4 } = require("uuid");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const app = express();
const port = 3000;
app.use(cors());
app.use(bodyParser.json());
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "2h-delivery",
});

db.connect((err) => {
  if (err) {
    console.error("Lỗi kết nối MySQL: ", err);
    return;
  }
  console.log("✅ Kết nối MySQL thành công!");
});
async function hashPassword(password) {
  console.log("password: ", password);
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
}

async function checkPassword(inputPassword, hashedPassword) {
  return await bcrypt.compare(inputPassword, hashedPassword);
}
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  db.query(
    "SELECT * FROM users WHERE email = ? ",
    [email],
    async (err, rows, fields) => {
      if (err) throw err;
      console.log("rows[0]:", rows[0]);
      if (rows[0]) {
        const isMatch = await checkPassword(password, rows[0].password);
        if (isMatch) {
          res.send({
            status: "success",
            user: rows[0],
          });
        } else {
          console.log("sai mat khau");
          res.send({
            status: "incorrectPassword",
            user: null,
          });
        }
      } else {
        res.send({
          status: "nonExists",
          user: null,
        });
      }
    }
  );
});

app.post("/signUp", async (req, res) => {
  const { email, password, fullname, phone } = req.body;
  const hashedPassword = await hashPassword(password);
  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    (err, rows, fields) => {
      if (err) throw err;
      if (!rows[0]) {
        const userId = uuidv4();
        db.query(
          "INSERT INTO users (id,email, password, fullname, phone) VALUES (?,?,?,?,?)",
          [userId, email, hashedPassword, fullname, phone],
          (err, rows, fields) => {
            if (err) throw err;
            res.send({
              status: "success",
            });
          }
        );
      } else {
        if (password === "1") {
          res.send({
            status: "success",
          });
        } else {
          console.log("email exists");
          res.send({
            status: "exists",
          });
        }
      }
    }
  );
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
