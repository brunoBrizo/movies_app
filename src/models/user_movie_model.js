const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database/sequelize");
const User = require("./user_model");

class UserFavouriteMovies extends Model {}
UserFavouriteMovies.init(
  {
    userId: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id",
      },
    },
    movieId: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: false,
    },
    original_language: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Language must not be empty",
        },
        max: {
          args: 20,
          msg: "Language max length is 20 characters",
        },
      },
    },
    original_title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Title must not be empty",
        },
        max: {
          args: 250,
          msg: "Title max length is 250 characters",
        },
      },
    },
    overview: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Overview must not be empty",
        },
        max: {
          args: 1000,
          msg: "Oveview max length is 1000 characters",
        },
      },
    },
    vote_average: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Vote average must not be empty",
        },
      },
    },
    poster_path: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        max: {
          args: 250,
          msg: "Poster path max length is 250 characters",
        },
      },
    },
  },
  {
    sequelize,
    modelName: "userFavouriteMovies",
    timestamps: true,
  }
);

module.exports = UserFavouriteMovies;
