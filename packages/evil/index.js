const express = require("express");
const path = require('path');

const app = express();

/** CORS */
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, Content-Type, Accept"
  );
  next();
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.listen(666, () => {
  console.log("Started evil");
});
