const User = require("../models/user_model");
const Movie = require("../models/movie_model");
const UserFavouriteMovies = require("../models/user_movie_model");

//User Movie association
User.hasMany(UserFavouriteMovies);

UserFavouriteMovies.belongsTo(User, {
  foreignKey: "userId",
});
