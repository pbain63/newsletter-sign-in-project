require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");

const client = require("@mailchimp/mailchimp_marketing");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

////added these two lines code for .env

const apikey = process.env.API_KEY;
const ser_ver = process.env.SERVER;
const id = process.env.ID;
//

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
  const firstName = req.body.fname;
  const lastName = req.body.lname;
  const email = req.body.email;
  //console.log(firstName, lastName, email);

  client.setConfig({
    apiKey: apikey, //apikey from those two lines of code
    server: ser_ver,
  });

  const run = async () => {
    const response = await client.lists.batchListMembers(id, {
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
