const AppError = require("../utils/app_error");
const themoviedb = require("../logic/themoviedb");
const Movie = require("../models/movie_model");
const Utils = require("../utils//utils");

async function getMovies(keyword) {
  try {
    const result = await themoviedb.getMovies(keyword);
    if (result) {
      const movies = await _parseMovieResponse(result);
      return movies;
    }
    return null;
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

_parseMovieResponse = async (data) => {
  try {
    let lstMovies = [];

    data.results.forEach((m) => {
      let auxMovie = Object.assign(new Movie(), {
        movieId: m.id,
        original_language: m.original_language,
        original_title: m.original_title,
        overview: m.overview,
        vote_average: m.vote_average,
        poster_path: m.poster_path,
      });
      auxMovie.suggestionScore = Utils.getRandomInt(0, 100);
      lstMovies.push(auxMovie);
    });

    //sorting movies list ascending by suggestionScore
    lstMovies.sort((a, b) => a.suggestionScore - b.suggestionScore);

    return lstMovies;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = {
  getMovies,
};
