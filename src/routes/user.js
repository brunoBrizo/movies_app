const express = require("express");
const router = express.Router();
const authenticate = require("../logic/authenticate");
const userController = require("../controllers/user_controller");

//   /api/user/
router.get("/", authenticate, userController.getUsers);

//   /api/user/1
router.get("/:user_id", authenticate, userController.getUserById);

//   /api/user/fav-movies
router.get("/fav-movies", authenticate, userController.getFavouriteMovies);

//   /api/user/
router.post("/", userController.insertUser);

//   /api/user/login
router.post("/login", userController.login);

//   /api/user/logout
router.post("/logout", authenticate, userController.logout);

//   /api/user/me
router.get("/me", authenticate, userController.getUserInfo);

module.exports = router;
