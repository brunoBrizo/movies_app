const express = require("express");
const User = require("../models/user_model");
const router = express.Router();

//GETTERS
router.get("/", async (req, res) => {
  const users = await User.findAll();
  res.status(200).send({
    users,
  });
});

router.get("/:user_id", async (req, res) => {
  try {
    const userId = req.params.user_id;
    const user = await User.findOne({ where: { id: userId } });
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send({
      msg: error,
    });
  }
});

//POST
router.post("/", async (req, res) => {
  try {
    await User.create(req.body);
    res.status(201).send({
      msg: "User created",
    });
  } catch (error) {
    res.status(501).send({
      msg: error.errors[0].message,
    });
  }
});

//GET FAVOURITE MOVIES
router.get("/fav-movies", async (req, res) => {
  try {
    //get user authenticated
    const userId = req.body.id;
    const user = User.findByPk(userId, {
      include: {
        association: "userFavouriteMovies",
      },
    });

    res.status(201).send({
      user,
    });
  } catch (error) {
    res.status(501).send({
      msg: error.errors[0].message,
    });
  }
});

//PATCH
router.patch("/", async (req, res) => {
  try {
    const userId = req.body.id;
    if (userId > 0) {
      const user = await User.findOne({ where: { id: userId } });
      user.firstname = req.body.firstname;
      await user.save();
      res.status(202).send({
        user,
      });
    } else {
      res.status(501).send({
        msg: "User Id must not be empty.",
      });
    }
  } catch (error) {
    res.status(501).send({
      msg: error.errors[0].message,
    });
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const userEmail = req.body.email;
    const userPwd = req.body.password;
    const user = await User.findOne({
      where: { email: userEmail, password: userPwd },
    });
    if (user == null) {
      res.status(404).send({
        error: "Unknown user",
      });
    } else {
      res.status(200).send(user);
    }
  } catch (error) {
    res.status(501).send({
      msg: error,
    });
  }
});

module.exports = router;
