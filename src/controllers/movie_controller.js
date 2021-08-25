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

const getMovieById = async (req, res, next) => {
  try {
    const movieId = req.params.movie_id;
    if (!movieId) {
      throw new AppError("Movie Id must not be empty", 400);
    }
    if (isNaN(movieId)) {
      throw new AppError("Movie Id must be a number", 400);
    }
    const movie = await movieService.getMovieById(movieId);
    if (movie) {
      res.status(200).send({
        movie,
      });
    } else {
      throw new AppError("Movie not found", 404);
    }
  } catch (error) {
    _errorHandler(error, next);
  }
};

_errorHandler = async (error, next) => {
  if (error.isOperational == null) {
    const error = new AppError(error.message, 500);
    return next(error);
  } else {
    //already getting a custom app error
    return next(error);
  }
};

module.exports = {
  getMovies,
  getMovieById,
};
