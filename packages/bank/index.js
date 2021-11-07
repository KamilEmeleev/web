const express = require("express");
const path = require('path');

const app = express();

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
  res.header("Access-Control-Allow-Origin", "http://bank.com:1000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, Content-Type, Accept"
  );
  next();
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.post("/auth", (req, res) => {
  res.header(
      "Set-Cookie",
      "token=12345; domain=bank.com;"
  );
  res.status(200).send({ status: 'success' });
});

app.post("/pay", (req, res) => {
  const cookies = getCookies(req.headers.cookie);
  console.log(cookies);
  if (cookies.token) {
    res.status(200).send({ status: 'success' });
  } else {
    res.status(401).send({ status: 'canceled' });
  }
});

app.listen(1000, () => {
  console.log("Started bank");
});
