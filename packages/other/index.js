const express = require("express");
const path = require('path');

const app = express();
app.set('view engine', 'ejs');

const getCookies = (value) => {
  let res = {};
  if (!value) {
    return res;
  }
  const cookies = value.replace(/ /g, '').split(';');
  for (let item of cookies) {
    const [key, value] = item.split('=');
    res[key] = value;
  }
  return res;
}

/** CORS */
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "other.com");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, Content-Type, Accept"
  );
  next();
});

app.get("/", function (req, res) {
  const cookies = getCookies(req.headers.cookie);
  res.render('index', { user: cookies.user });
});

app.get("/public/*", async (req, res) => {
  const file = req.path.split('/')[2];
  const cookies = getCookies(req.headers.cookie);
  if (!cookies.user) {
    res.header(
        "Set-Cookie",
        "user=Tom; domain=other.com; path=/"
    );
  }
  res.sendFile(path.join(__dirname, `/public/${file}`));
});

app.listen(1002, () => {
  console.log("Started other");
});
