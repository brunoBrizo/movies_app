/*
    {
        "created_by": "Bruno Brizolara",
        "created_at": "23/08/2021",
        "description": "handles users logic, validations and db querys",
        "modified_at": "25/08/2021"
    }
*/
const User = require("../models/user_model");
const bcrypt = require("bcrypt");
const jwt = require("../logic/jwt");
const AppError = require("../utils/app_error");
const validator = require("email-validator");
const Sequelize = require("sequelize");
const UserMovieModel = require("../models/user_movie_model");
const Utils = require("../utils/utils");

getUsers = async () => {
  try {
    const users = await User.findAll();
    return users;
  } catch (error) {
    _errorHandler(error);
  }
};

getUserById = async (userId) => {
  try {
    const user = await User.findOne({ where: { id: userId } });
    if (user) return _cleanUserReturn(user);
    else return null;
  } catch (error) {
    _errorHandler(error);
  }
};

insertUser = async (user) => {
  try {
    //validation
    await _userInsertValidator(user);

    //hash incoming password
    var hash = await bcrypt.hash(user.password, 10);
    user.password = hash;

    let userCreated = await User.create(user);
    if (!userCreated) {
      throw new AppError("User not created", 500);
    } else {
      //user created, creating a token
      const token = jwt.sign({ user: userCreated.id });
      userCreated.authToken = token;

      //updating users token on db
      await userCreated.save();
      user = _cleanUserReturn(userCreated);
      const newUser = {
        user,
        token,
      };
      return newUser;
    }
  } catch (error) {
    await _errorHandler(error);
  }
};

addFavouriteMovie = async (user, movie) => {
  try {
    //validations
    await _userAddFavouriteMovieValidator(movie, user.id);

    //parsing incoming movie to UserMovieModel
    let newUserMovie = Object.assign(UserMovieModel, movie);

    //assign user FK
    newUserMovie.userId = user.id;
    const result = await UserMovieModel.create(newUserMovie);
    return result;
  } catch (error) {
    await _errorHandler(error);
  }
};

getFavouriteMovies = async (currentUser) => {
  try {
    let userMovies = await UserMovieModel.findAll({
      where: { userId: currentUser.id },
    });
    userMovies = await _parseUserMovieReturn(userMovies);
    return userMovies;
  } catch (error) {
    await _errorHandler(error);
  }
};

login = async (userEmail, userPwd) => {
  try {
    //validation
    await _userLoginValidator(userEmail, userPwd);
    let result = await User.findOne({
      where: { email: userEmail },
    });
    if (!result) {
      throw new AppError("Invalid credentials", 401);
    } else {
      //checking if pwd matches
      const match = await bcrypt.compare(userPwd, result.password);
      if (match) {
        const token = jwt.sign({ user: result.id });

        //updating users token on db
        result.authToken = token;
        await result.save();

        const user = _cleanUserReturn(result);
        const response = {
          user,
          token,
        };
        return response;
      } else {
        throw new AppError("Invalid credentials", 401);
      }
    }
  } catch (error) {
    await _errorHandler(error);
  }
};

logout = async (user) => {
  try {
    //updating user token on db
    user.authToken = null;
    await user.save();
    return true;
  } catch (error) {
    await _errorHandler(error);
  }
};

module.exports = {
  getUsers,
  getUserById,
  insertUser,
  login,
  logout,
  addFavouriteMovie,
  getFavouriteMovies,
};

_cleanUserReturn = (user) => {
  //removing attributes for the response
  const { password, updatedAt, createdAt, authToken, ...result } =
    user.toJSON();
  return result;
};

_parseUserMovieReturn = (userMovie) => {
  let userMovieRet = [];

  //removing attributes for the response
  userMovie.forEach((u) => {
    const { updatedAt, userId, ...auxUserMovie } = u.toJSON();

    //adding new field suggestionForTodayScore with random int
    auxUserMovie.suggestionForTodayScore = Utils.getRandomInt(0, 100);
    userMovieRet.push(auxUserMovie);
  });

  //sorting user movies list ascending by suggestionForTodayScore
  userMovieRet.sort(
    (a, b) => a.suggestionForTodayScore - b.suggestionForTodayScore
  );
  return userMovieRet;
};

_userInsertValidator = async (user) => {
  let errorMsg;
  let validUser = true;
  validEmail = validator.validate(user.email);
  if (!validEmail) {
    validUser = false;
    errorMsg = "Email is invalid";
  }
  if (validUser) {
    const auxUser = await User.findOne({ where: { email: user.email } });
    if (auxUser) {
      validUser = false;
      errorMsg = "Email is already in use";
    }
  }
  if (validUser && !user.firstname) {
    validUser = false;
    errorMsg = "Firstname must not be empty";
  }
  if (validUser && !user.lastname) {
    validUser = false;
    errorMsg = "Lastname must not be empty";
  }
  if (validUser && !user.password) {
    validUser = false;
    errorMsg = "Password must not be empty";
  }
  if (validUser && user.password.length < 5) {
    validUser = false;
    errorMsg = "Password must have at least 5 characters";
  }
  if (!validUser) {
    throw new AppError(errorMsg, 400);
  }
  return true;
};

_userAddFavouriteMovieValidator = async (movie, userId) => {
  let errorMsg;
  let validMovie = true;

  if (!movie.movieId) {
    errorMsg = "Movie Id must not be empty";
    validMovie = false;
  }
  if (validMovie) {
    const auxUserMovie = await UserMovieModel.findOne({
      where: { userId: userId, movieId: movie.movieId },
    });

    if (auxUserMovie) {
      errorMsg = "Movie already added as favourite";
      validMovie = false;
    }
  }

  if (validMovie && !movie.original_language) {
    errorMsg = "Language must not be empty";
    validMovie = false;
  }

  if (validMovie && !movie.original_title) {
    errorMsg = "Title must not be empty";
    validMovie = false;
  }
  if (validMovie && !movie.overview) {
    errorMsg = "Overview must not be empty";
    validMovie = false;
  }
  if (validMovie && !movie.vote_average) {
    errorMsg = "Vote average must not be empty";
    validMovie = false;
  }
  if (validMovie && !movie.poster_path) {
    errorMsg = "Poster path must not be empty";
    validMovie = false;
  }
  if (!validMovie) {
    throw new AppError(errorMsg, 400);
  }
  return true;
};

_userLoginValidator = (userEmail, userPwd) => {
  let errorMsg = "";
  let validUser = true;
  let validEmail = true;

  if (!userEmail) {
    validUser = false;
    errorMsg = "Email must not be empty";
  }

  validEmail = validator.validate(userEmail);
  if (validUser && !validEmail) {
    validUser = false;
    errorMsg = "Email is invalid";
  }
  if (validUser && !userPwd) {
    validUser = false;
    errorMsg = "Password must not be empty";
  }

  if (!validUser) {
    throw new AppError(errorMsg, 400);
  }
  return true;
};

//trying a different function syntax
async function _errorHandler(error) {
  let msg, status;
  if (error instanceof Sequelize.Error) {
    if (error.errors.length > 0) {
      msg = error.errors[0].message;
      status = 400;
    } else {
      status = 500;
      msg = "Server unavailable";
    }
    error = new AppError(msg, status);
  }

  throw error;
}
