const express = require("express");
const path = require('path');

const app = express();

/** CORS */
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.get("/api", async (req, res) => {
  res.header(
      "Set-Cookie",
      "token=12345; domain=bank.com;"
  );
  res.send('api')
});

app.listen(1001, function () {
  console.log("Started API");
});
