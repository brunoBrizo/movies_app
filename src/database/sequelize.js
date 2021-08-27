/*
    {
        "created_by": "Bruno Brizolara",
        "created_at": "22/08/2021",
        "description": "configuring the sequelize database",
        "modified_at": ""
    }
*/
const { Sequelize } = require("sequelize");
const { database } = require("../logic/config");

const sequelize = new Sequelize(
  database.database,
  database.username,
  database.password,
  {
    host: database.host,
    dialect: "sqlite",
    logging: false,
  }
);

module.exports = sequelize;
