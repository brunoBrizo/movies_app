const AppError = require("../utils/app_error");
const themoviedb = require("../logic/themoviedb");
const Movie = require("../models/movie_model");

async function getMovies(keyword) {
  try {
    const result = await themoviedb.getMovies(keyword);
    //console.log(result);
    if (result) {
      const movies = await _parseResponseToMovieModel(result);

      //sorting movies list ascending by suggestionScore
      movies.sort((a, b) => a.suggestionScore - b.suggestionScore);
      return movies;
    }
    return null;
  } catch (error) {
    _errorHandler(error);
  }
}

async function getMovieById(movieId) {
  try {
    const movie = await themoviedb.getMovieById(movieId);
    if (movie) return movie;
    else return null;
  } catch (error) {
    _errorHandler(error);
  }
}

async function _errorHandler(error) {
  let msg, status;
  //   if (error instanceof Sequelize.Error) {
  //     if (error.errors.length > 0) {
  //       msg = error.errors[0].message;
  //       status = 400;
  //     } else {
  //       status = 500;
  //       msg = "Server unavailable";
  //     }
  //     throw new AppError(msg, status);
  //   }

  throw error;
}

_parseResponseToMovieModel = async (data) => {
  try {
    let lstMovies = [];

    data.results.forEach((m) => {
      let auxMovie = Object.assign(new Movie(), {
        id: m.id,
        original_language: m.original_language,
        original_title: m.original_title,
        overview: m.overview,
        vote_average: m.vote_average,
        poster_path: m.poster_path,
        suggestionScore: _getRandomArbitrary(0, 100),
      });
      lstMovies.push(auxMovie);
    });
    return lstMovies;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

_getRandomArbitrary = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

module.exports = {
  getMovies,
  getMovieById,
};
