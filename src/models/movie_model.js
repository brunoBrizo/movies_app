class Movie {
  constructor(
    id,
    original_language,
    original_title,
    overview,
    vote_average,
    poster_path,
    suggestionScore
  ) {
    this.id = id;
    this.original_language = original_language;

    this.original_title = original_title;
    this.overview = overview;
    this.vote_average = vote_average;
    this.poster_path = poster_path;
    this.suggestionScore = suggestionScore;
  }
  toString() {
    console.log("id: " + this.id + " title: " + this.original_title);
  }
}

module.exports = Movie;
