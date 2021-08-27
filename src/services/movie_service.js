/*
    {
        "created_by": "Bruno Brizolara",
        "created_at": "24/08/2021",
        "description": "handles movies logic",
        "modified_at": "25/08/2021"
    }
*/
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
    throw error;
  }
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

      //adding new field suggestionScore with random int
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
