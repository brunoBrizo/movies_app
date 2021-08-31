/*
    {
        "created_by": "Bruno Brizolara",
        "created_at": "22/08/2021",
        "description": "handle user requests and parse response to the user",
        "modified_at": "26/08/2021"
    }
*/
const { response } = require("express");
const User = require("../models/user_model");
const userService = require("../services/user_service");
const AppError = require("../utils/app_error");
require("dotenv").config();

const getUsers = async (req, res, next) => {
  try {
    let { limit = 5, from = 0 } = req.query;
    if (isNaN(limit)) {
      limit = 5;
    }
    if (isNaN(from)) {
      from = 0;
    }
    const users = await userService.getUsers(limit, from);
    if (users) {
      res.status(200).send({
        status: 200,
        users,
      });
    } else {
      throw new AppError("No users found", 400);
    }
  } catch (error) {
    await _errorHandler(error, next);
  }
};

const insertUser = async (req, res, next) => {
  try {
    const user = req.body;
    const newUser = await userService.insertUser(user);

    res.status(201).send({
      status: 201,
      user: newUser.user,
      token: newUser.token,
    });
  } catch (error) {
    await _errorHandler(error, next);
  }
};

const addFavouriteMovie = async (req, res, next) => {
  try {
    const movie = req.body;

    //get authenticated user
    const currentUser = req.auth;
    await userService.addFavouriteMovie(currentUser, movie);

    res.status(201).send();
  } catch (error) {
    await _errorHandler(error, next);
  }
};

const getFavouriteMovies = async (req, res, next) => {
  try {
    //get authenticated user
    const currentUser = req.auth;
    const movies = await userService.getFavouriteMovies(currentUser);
    res.status(200).send({
      status: 200,
      movies,
    });
  } catch (error) {
    await _errorHandler(error, next);
  }
};

const login = async (req, res, next) => {
  try {
    const result = await userService.login(req.body.email, req.body.password);
    res.status(200).send({
      status: 200,
      user: result.user,
      token: result.token,
    });
  } catch (error) {
    await _errorHandler(error, next);
  }
};

const logout = async (req, res, next) => {
  try {
    //get authenticated user
    const currentUser = req.auth;
    const result = await userService.logout(currentUser);

    res.status(200).send();
  } catch (error) {
    await _errorHandler(error, next);
  }
};

_errorHandler = async (error, next) => {
  //already getting a custom app error
  if (error.isOperational == null) {
    error = new AppError(error.message, 500);
  }
  return next(error);
};

module.exports = {
  getUsers,
  insertUser,
  getFavouriteMovies,
  login,
  logout,
  addFavouriteMovie,
};
