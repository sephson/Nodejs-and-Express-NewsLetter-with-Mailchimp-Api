const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/signup.html");
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/signup.css");
});

app.post("/", (req, res) => {
  const firstName = req.body.firstName;
  const secondName = req.body.secondName;
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: secondName,
        },
      },
    ],
  };

  const jsonData = JSON.stringify(data);
  //   const apiKey = "666b0d9557d98a2938be64a65e5f0bdc-us6";
  //   const listId = c4c83607fb;
  const url = "https://us6.mailchimp.com/account/api";

  options = {
    method: "POST",
    auth: "toyin:666b0d9557d98a2938be64a65e5f0bdc-us6",
  };

  const request = https.request(url, options, (response) => {
    response.statusCode === 200 ? res.send("Success") : res.send("Not found");
    response.on("/data", (data) => {
      console.log(JSON.parse(data));
    });
  });

  request.write(jsonData);
  request.end();
});

app.listen(3000, () => {
  console.log("server running on port 3000");
});

//
//
