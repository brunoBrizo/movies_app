/*
    {
        "created_by": "Bruno Brizolara",
        "created_at": "23/08/2021",
        "description": "handle movie requests and parse response to the user",
        "modified_at": "25/08/2021"
    }
*/
const AppError = require("../utils/app_error");
const movieService = require("../services/movie_service");

const getMovies = async (req, res, next) => {
  try {
    const keyword = req.query.keyword;
    const movies = await movieService.getMovies(keyword);
    if (movies) {
      res.status(200).send({
        movies,
      });
    } else {
      throw new AppError("No movies found", 400);
    }
  } catch (error) {
    _errorHandler(error, next);
  }
};

_errorHandler = async (error, next) => {
  //check if its a custom app error
  if (error.isOperational == null) {
    const error = new AppError(error.message, 500);
    return next(error);
  } else {
    return next(error);
  }
};

module.exports = {
  getMovies,
};
