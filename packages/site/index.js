import express from 'express';

const app = express();
app.set('view engine', 'ejs');

/** CORS */
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "abc.com");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, Content-Type, Accept"
  );
  next();
});

app.get("/", function (req, res) {
  res.render('index');
});

app.listen(1003, () => {
  console.log("Started site");
});
