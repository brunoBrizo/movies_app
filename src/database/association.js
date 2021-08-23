const User = require("../models/user_model");
const Movie = require("../models/movie_model");
const UserFavouriteMovies = require("../models/user_movie_model");

User.belongsToMany(Movie, { through: "userFavouriteMovies" });

Movie.belongsToMany(User, { through: "userFavouriteMovies" });
