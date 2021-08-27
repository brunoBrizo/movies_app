/*
    {
        "created_by": "Bruno Brizolara",
        "created_at": "21/08/2021",
        "description": "user api routes, delegates logic to userController",
        "modified_at": "25/08/2021"
    }
*/
const express = require("express");
const router = express.Router();
const authenticate = require("../logic/authenticate");
const userController = require("../controllers/user_controller");

//   /api/user/
router.get("/", authenticate, userController.getUsers);

//   /api/user/fav-movies
router.get("/fav-movies", authenticate, userController.getFavouriteMovies);

//   /api/user/
router.post("/", userController.insertUser);

//   /api/user/add-fav-movie
router.post("/add-fav-movie", authenticate, userController.addFavouriteMovie);

//   /api/user/login
router.post("/login", userController.login);

//   /api/user/logout
router.post("/logout", authenticate, userController.logout);

module.exports = router;
