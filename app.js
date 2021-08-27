/*
    {
        "created_by": "Bruno Brizolara",
        "created_at": "21/08/2021",
        "description": "configuration of our app",
        "modified_at": "25/08/2021"
    }
*/
const express = require("express");
const app = express();
const morgan = require("morgan");
const sequelize = require("./src/database/sequelize");
const AppError = require("./src/utils/app_error");
require("./src/database/association");
const { userRoutes, movieRoutes } = require("./src/routes");
const swaggerUi = require("swagger-ui-express");
const swaggerJson = require("./docs/swagger.json");

sequelize.sync();

app.use(morgan("dev"));

//accept only simple data
app.use(express.urlencoded({ extended: false }));

//parsing json objects
app.use(express.json());
app.use((req, res, next) => {
  //cors handler
  res.header("Acces-Control-Allow-Origin", "*");
  res.header(
    "Acces-Control-Allow-Header",
    "Origin, X-Requested-With",
    "Content-Type",
    "Accept",
    "Authorization"
  );

  //allow only get/post methods
  if (req.method === "OPTIONS") {
    res.header("Acces-Control-Allow-Methods", "GET", "POST");
    return res.status(200).send({});
  }
  next();
});

//adding routes
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJson));
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/movie", movieRoutes);

//404 NOT FOUND handler
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
