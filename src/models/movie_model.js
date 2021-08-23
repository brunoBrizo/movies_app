const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database/sequelize");
const User = require("./user_model");
const UserFavouriteMovies = require("./user_movie_model");

class Movie extends Model {}
Movie.init(
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        max: 500,
      },
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    suggestionScore: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
        max: 99,
      },
    },
  },
  {
    sequelize,
    modelName: "movie",
    timestamps: true,
  }
);

module.exports = Movie;
