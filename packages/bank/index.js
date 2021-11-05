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

app.get("/pay", async (req, res) => {
  const cookie = req.headers.cookie?.split(';');
  const token = cookie?.[0]?.split('=')[1];
  console.log('pay', req.headers.cookie);
  if (token) {
    res.send(200, { status: 'payed' })
  } else {
    res.send(401, { status: 'canceled' });
  }
});

app.listen(1000, function () {
  console.log("Started bank");
});
