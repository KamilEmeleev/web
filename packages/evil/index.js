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

app.use(express.static(__dirname + '/views'));
app.set('view engine', 'ejs');

app.get("/", function (req, res) {
  const cookie = req.headers.cookie?.split(';');
  const user = cookie?.[0]?.split('=')[1];
  res.render('index', { user: user });
});

app.get("/banner", async (req, res) => {
  console.log(req.headers.cookie);
  res.header(
      "Set-Cookie",
      "user=Tom; domain=evil.com;"
  );
  res.sendFile(path.join(__dirname, '/banner.jpeg'));
});

app.get("/api", async (req, res) => {
  console.log(req.headers.cookie);
  res.header(
      "Set-Cookie",
      "token=666; domain=evil.com;"
  );
  res.send('api')
});

app.listen(666, function () {
  console.log("Started evil");
});
