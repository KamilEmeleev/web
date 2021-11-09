import express from 'express';
import path from 'path';
import { getCookies } from '../../utils/cookies';

const app = express();

/** CORS */
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://bank.com:1000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, Content-Type, Accept"
  );
  // Это означает, что запрос на отправку файлов cookie разрешен.
  res.header(
      "Access-Control-Allow-Credentials",
      'true'
  );
  next();
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, '/views/index.html'));
});

app.post("/auth", (req, res) => {
  res.header(
      "Set-Cookie",
      "token=12345; Domain=bank.com; SameSite=Strict"
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

app.listen(1001, () => {
  console.log("started api");
});
