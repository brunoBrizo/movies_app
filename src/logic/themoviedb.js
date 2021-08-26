const fetch = require("node-fetch");
const AppError = require("../utils/app_error");

getMovies = async (keyword) => {
  try {
    let getMoviesUrl;
    if (keyword) {
      getMoviesUrl =
        "https://api.themoviedb.org/3/search/movie?api_key=55195cba1fbda14b0773b0f7ea9e3b7f&language=en-US&query=" +
        keyword +
        "&page=1&include_adult=false";
    } else {
      getMoviesUrl =
        "https://api.themoviedb.org/3/movie/top_rated?api_key=55195cba1fbda14b0773b0f7ea9e3b7f&language=en-US&page=1";
    }

    const result = await fetch(getMoviesUrl, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const { status } = result;
    if (status != 200) {
      throw new AppError("An error ocurred while trying to get movies", 500);
    }

    const data = result.json();
    return data;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getMovies,
};
