var mysql = require("mysql");
var express = require("express");
var bodyParser = require("body-parser");
const { use } = require("express/lib/application");

const app = express();
app.set("view engine", "ejs");
app.set("views", "views");
app.use(bodyParser.urlencoded({ extended: false }));

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "db",
});

con.connect((err, res) => {
  if (err) {
    console.error(err.message);
  } else console.log("my sql is connected");
});

app.get("/", function (req, res) {
  res.render("index");
});

app.post("/insert", function (req, res, next) {
  let data = { name: req.body.name, age: req.body.age };
  var sql = "insert into user set ?";

  console.log(data);
  con.query(sql, data, (err, result) => {
    if (err) {
      console.log(err.message);
    } else {
      res.send(result);
    }
    next();
  });
});

app.get("/deleteuser/:name", (req, res) => {
  var user = [];
  user.push(String(req.params.name));
  console.log(user);
  var sql = "delete from user where name = ?";
  con.query(sql, user, (err, result) => {
    if (err) {
      console.error(err.message);
    } else {
      res.send(result);
    }
  });
});

app.listen("3000", () => {
  console.log("server started at port 3000");
});
