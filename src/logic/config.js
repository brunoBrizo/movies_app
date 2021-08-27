/*
    {
        "created_by": "Bruno Brizolara",
        "created_at": "22/08/2021",
        "description": "configuration module for database and JWT",
        "modified_at": "26/08/2021"
    }
*/
require("dotenv").config();

module.exports = {
  database: {
    username: process.env.BD_USER,
    password: process.env.BD_PASS,
    database: "moviesdb",
    host: "./moviesdb.sqlite3",
  },
  jwt_config: {
    secret: process.env.JWT_SECRET,
    expiresIn: parseInt(process.env.JWT_EXPIRESIN), //expires in 24hours
  },
};
