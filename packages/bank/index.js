import express from 'express';
import path from 'path';
import { getCookies } from '../../utils/cookies';

const app = express();

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
  res.sendFile(path.join(__dirname, '/views/index.html'));
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
