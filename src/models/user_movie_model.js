const { Model, DataTypes, Association } = require("sequelize");
const sequelize = require("../database/sequelize");
const Movie = require("./movie_model");
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
      references: {
        model: Movie,
        key: "id",
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
