/*
    {
        "created_by": "Bruno Brizolara",
        "created_at": "23/08/2021",
        "description": "movie class for parsing http responses (NOT persisted on database)",
        "modified_at": "25/08/2021"
    }
*/
class Movie {
  constructor(
    movieId,
    original_language,
    original_title,
    overview,
    vote_average,
    poster_path
  ) {
    this.movieId = movieId;
    this.original_language = original_language;

    this.original_title = original_title;
    this.overview = overview;
    this.vote_average = vote_average;
    this.poster_path = poster_path;
  }
}

module.exports = Movie;
