const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

require("dotenv").config();

const app = express();

// to access static files like css and image we will use express and relative path to those files

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us19.api.mailchimp.com/3.0/lists/abd6c02491";

  const apiKey = process.env.API_KEY;

  const options = {
    method: "POST",
    auth: apiKey
  };

  // from node.js https module --> https.get(url, options, callback)
  const request = https.request(url, options, function (response) {
    response.on("data", function (data) {
      console.log(JSON.parse(data));
    });
  });

  request.write(jsonData);
  request.end();
});

app.listen(3000, function () {
  console.log("Server is running on port 3000");
});

// API key

// List ID

// abd6c02491
