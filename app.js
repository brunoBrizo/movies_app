const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const sequelize = require("./src/database/sequelize");
const AppError = require("./src/utils/app_error");
require("./src/database/association");

const userRoutes = require("./src/routes/user");
const movieRoutes = require("./src/routes/movie");
const { json } = require("body-parser");

sequelize.sync().then(() => console.log("db ready"));

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false })); //accept only simple data
app.use(json());
app.use((req, res, next) => {
  res.header("Acces-Control-Allow-Origin", "*");
  res.header(
    "Acces-Control-Allow-Header",
    "Origin, X-Requested-With",
    "Content-Type",
    "Accept",
    "Authorization"
  );

  if (req.method === "OPTIONS") {
    res.header("Acces-Control-Allow-Methods", "GET", "POST");
    return res.status(200).send({});
  }
  next();
});

app.use("/api/user", userRoutes);
app.use("/api/movie", movieRoutes);

//404 NOT FOUND
app.use((req, res, next) => {
  next(new AppError("Not found", 404));
});

//ERROR HANDLER
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  return res.send({
    error: {
      status: error.status || 500,
      message: error.message,
    },
  });
});

module.exports = app;
