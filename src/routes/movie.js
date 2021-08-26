/*
    {
        "created_by": "Bruno Brizolara",
        "created_at": "21/08/2021",
        "description": "movie api routes, delegates logic to movieController",
        "modified_at": "24/08/2021"
    }
*/
const express = require("express");
const router = express.Router();
const authenticate = require("../logic/authenticate");
const movieController = require("../controllers//movie_controller");

//   /api/movie/  OR  /api/movie/?keyword=venom
router.get("/", authenticate, movieController.getMovies);

module.exports = router;
