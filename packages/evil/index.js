import express from 'express';
import path from 'path';

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
  res.sendFile(path.join(__dirname, '/views/index.html'));
});

app.listen(666, () => {
  console.log("Started evil");
});
