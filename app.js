const express = require("express");
const bodyParser = require("body-parser");
//const request = require("request");
//const https = require("https");
const client = require("@mailchimp/mailchimp_marketing");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true })); 

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
  const firstName = req.body.fname;
  const lastName = req.body.lname;
  const email = req.body.email;
  //console.log(firstName, lastName, email);

  client.setConfig({
    apiKey: "29543e83c1a76f3309e7951f018af1d2-us21",
    server: "us21",
  });

  const run = async () => {
    const response = await client.lists.batchListMembers("718ea68962", {
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
    });
    //console.log(response);
    //const jasonData = JSON.stringify(response);
    //console.log(jasonData);
  };

  run();

  res.sendFile(__dirname + "/success.html");
});

app.post("/failure", function (req, res) {
  res.redirect("/");
});

app.post("/success", function (req, res) {
  res.redirect("/");
});

app.listen(3000, function () {
  console.log("Server is running on port 3000.");
});

require('dotenv').config();
const apikey = process.env.apiKey;