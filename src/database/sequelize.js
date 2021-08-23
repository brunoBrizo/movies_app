const { Sequelize } = require("sequelize");
const { database } = require("../logic/config");

const sequelize = new Sequelize(
  database.database,
  database.username,
  database.password,
  {
    host: database.host,
    dialect: "sqlite",
  }
);

module.exports = sequelize;
