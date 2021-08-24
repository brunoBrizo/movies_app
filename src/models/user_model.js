const { Model, DataTypes, Association } = require("sequelize");
const sequelize = require("../database/sequelize");
const Movie = require("./movie_model");
const UserFavouriteMovies = require("./user_movie_model");

class User extends Model {}
User.init(
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
        //isEmail: true,
      },
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    authToken: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "user",
    timestamps: true,
  }
);

//TODO: user has many movies

module.exports = User;
