const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

// to access static files like css and image we will use express and relative path to those files

app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.listen(3000, function () {
  console.log("Server is running on port 3000");
});
