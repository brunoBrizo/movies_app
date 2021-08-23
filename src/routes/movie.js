const express = require("express");
const router = express.Router();

//GETTERS
router.get("/", (req, res, next) => {
  try {
    res.status(200).send({
      msg: "Get at movies OK",
    });
  } catch (error) {
    res.status(501).send({
      msg: error,
    });
  }
});

router.get("/:movie_id", (req, res, next) => {
  try {
    const movie_id = req.params.movie_id;
    let msg;
    if (movie_id == 1) {
      msg = "Id de usuario especial";
    } else {
      msg = "Id de usuario normal";
    }

    res.status(200).send({
      msg,
      movie_id,
    });
  } catch (error) {
    res.status(501).send({
      msg: error,
    });
  }
});

module.exports = router;
