/*
    {
        "created_by": "Bruno Brizolara",
        "created_at": "23/08/2021",
        "description": "configure user - favourite movies relation",
        "modified_at": "25/08/2021"
    }
*/
const User = require("../models/user_model");
const UserFavouriteMovies = require("../models/user_movie_model");

User.hasMany(UserFavouriteMovies);

UserFavouriteMovies.belongsTo(User, {
  foreignKey: "userId",
});
