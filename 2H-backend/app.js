const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");
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

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  db.query(
    "SELECT * FROM users WHERE email = ? AND password = ? ",
    [email, password],
    (err, rows, fields) => {
      if (err) throw err;
      console.log("users list: ", rows);
      if (rows[0]) {
        res.send({
          status: "success",
          user: rows[0],
        });
      } else {
        res.send({
          status: "fail",
          user: null,
        });
      }
    }
  );
});

app.post("/signUp", (req, res) => {
  const { email, password, fullname, phone } = req.body;
  console.log(req.body);
  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    (err, rows, fields) => {
      if (err) throw err;
      if (!rows[0]) {
        db.query(
          "INSERT INTO users (email, password, fullname, phone) VALUES (?,?,?,?)",
          [email, password, fullname, phone],
          (err, rows, fields) => {
            if (err) throw err;
          }
        );
      }
      res.send({
        status: "success",
      });
    }
  );
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
