const User = require("../models/user_model");
const jwt = require("./jwt");

const authUser = async (req, res, next) => {
  try {
    const [, token] = req.headers.authorization.split(" ");
    const payload = await jwt.verify(token);
    const user = await User.findOne({ where: { id: payload.user } });
    if (!user) {
      return res.send(401);
    }
    req.auth = user;
    next();
  } catch (error) {
    res.sendStatus(401);
  }
};

module.exports = authUser;
