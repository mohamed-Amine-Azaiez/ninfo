const express = require("express");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const HttpError = require("../backend/models/http-error");
const usersRoutes = require("../backend/routes/usersRoutes");

const app = express();
app.use(bodyParser.json());
app.use("/uploads/images", express.static(path.join("uploads", "images")));
app.use("/api/users", usersRoutes);

//app.use(fs)
app.use((req, res, next) => {
  const error = new HttpError("could not found any route", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, (err) => {
      console.log(err);
    });
  }
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "unknown error occured !" });
});

mongoose
  .connect(
    "mongodb+srv://mohamed_ibrahim_abouda:db0UCFA5Agx0HyPf@cluster0.uga1mum.mongodb.net/mern?retryWrites=true&w=majority",
    { useNewUrlParser: true }
  )
  .then(() => {
    app.listen(5000);
    console.log("connected!");
  })
  .catch((err) => console.log(err));
