/*
    {
        "created_by": "Bruno Brizolara",
        "created_at": "22/08/2021",
        "description": "handle user requests and parse response to the user",
        "modified_at": "26/08/2021"
    }
*/
const User = require("../models/user_model");
const userService = require("../services/user_service");
const AppError = require("../utils/app_error");

const getUsers = async (req, res, next) => {
  try {
    const users = await userService.getUsers();
    if (users) {
      res.status(200).send({
        users,
      });
    } else {
      throw new AppError("No users found", 400);
    }
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const userId = req.params.user_id;
    if (!userId) {
      throw new AppError("User Id must not be empty", 400);
    }
    if (isNaN(userId)) {
      throw new AppError("User Id must be a number", 400);
    }
    const user = await userService.getUserById(userId);
    if (user) {
      res.status(200).send({
        user,
      });
    } else {
      throw new AppError("User not found", 404);
    }
  } catch (error) {
    _errorHandler(error, next);
  }
};

const insertUser = async (req, res, next) => {
  try {
    const user = req.body;
    const newUser = await userService.insertUser(user);

    res.status(201).send({
      msg: "User created",
      user: newUser.user,
      token: newUser.token,
    });
  } catch (error) {
    _errorHandler(error, next);
  }
};

const addFavouriteMovie = async (req, res, next) => {
  try {
    const movie = req.body;
    const user = req.auth;
    await userService.addFavouriteMovie(user, movie);

    res.status(201).send({
      msg: "Movie added to favourites",
    });
  } catch (error) {
    _errorHandler(error, next);
  }
};

const getFavouriteMovies = async (req, res, next) => {
  try {
    const currentUser = req.auth;
    const movies = await userService.getFavouriteMovies(currentUser);
    res.status(201).send({
      movies,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const result = await userService.login(req.body.email, req.body.password);
    res.status(200).send(result);
  } catch (error) {
    await _errorHandler(error, next);
  }
};

const logout = async (req, res, next) => {
  try {
    const currentUser = req.auth;
    if (currentUser.authToken === req.body.token) {
      const result = await userService.logout(currentUser);
      res.status(200).send();
    } else {
      throw new AppError("Unauthorized", 401);
    }
  } catch (error) {
    await _errorHandler(error, next);
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
  getUsers,
  getUserById,
  insertUser,
  getFavouriteMovies,
  login,
  logout,
  addFavouriteMovie,
};
