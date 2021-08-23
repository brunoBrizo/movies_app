const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const sequelize = require("./src/database/sequelize");
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
    res.header("Acces-Control-Allow-Methods", "GET", "POST", "PATCH");
    return res.status(200).send({});
  }
  next();
});

app.use("/api/user", userRoutes);
app.use("/api/movie", movieRoutes);

//404 NOT FOUND
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

//ERROR HANDLER
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  return res.send({
    error: {
      msg: error.message,
    },
  });
});

module.exports = app;
