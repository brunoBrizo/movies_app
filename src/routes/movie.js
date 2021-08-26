const express = require("express");
const router = express.Router();
const authenticate = require("../logic/authenticate");
const movieController = require("../controllers//movie_controller");

//   /api/movie/  OR  /api/movie/?keyword=venom
router.get("/", authenticate, movieController.getMovies);

module.exports = router;
