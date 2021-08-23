const express = require("express");
const User = require("../models/user_model");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("../logic/jwt");
const authenticate = require("../logic/authenticate");

//GETTERS
router.get("/", authenticate, async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).send({
      users,
    });
  } catch (error) {
    res.status(401).send({
      users,
    });
  }
});

router.get("/:user_id", authenticate, async (req, res) => {
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
router.post("/", authenticate, async (req, res) => {
  try {
    var newUser = req.body;
    var hash = await bcrypt.hash(newUser.password, 10);
    newUser.password = hash;
    const userCreated = await User.create(newUser);
    if (!userCreated) {
      res.status(406).send({
        msg: "User not created",
      });
    } else {
      const token = jwt.sign({ user: userCreated.id });
      res.status(201).send({
        msg: "User created",
        password: newUser.password,
        token: token,
      });
    }
  } catch (error) {
    res.status(406).send({
      msg: error.errors[0].message,
    });
  }
});

//GET FAVOURITE MOVIES
router.get("/fav-movies", authenticate, async (req, res) => {
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
router.patch("/", authenticate, async (req, res) => {
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
      res.status(401).send({
        msg: "User Id must not be empty.",
      });
    }
  } catch (error) {
    res.status(401).send({
      msg: error.errors[0].message,
    });
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const userEmail = req.body.email;
    const userPwd = req.body.password;
    const result = await User.findOne({
      where: { email: userEmail },
    });

    if (result == null) {
      res.status(401).send({
        error: "Invalid credentials",
      });
    } else {
      const match = await bcrypt.compare(userPwd, result.password);
      if (match) {
        const { password, updatedAt, createdAt, ...user } = result.toJSON();
        const token = jwt.sign({ user: user.id });
        res.status(200).send({ user, token });
      } else {
        res.status(401).send({
          error: "Invalid credentials",
        });
      }
    }
  } catch (error) {
    res.status(501).send({
      msg: error,
    });
  }
});

router.get("/me", authenticate, async (req, res) => {
  try {
    res.send(req.auth);
  } catch (error) {
    res.status(401).send({
      users,
    });
  }
});

module.exports = router;
