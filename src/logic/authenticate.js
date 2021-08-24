const User = require("../models/user_model");
const jwt = require("./jwt");
const appError = require("../utils/app_error");

const authUser = async (req, res, next) => {
  try {
    //get token from incoming header "Bearer wecfdWEFwef234wF..."
    const [, token] = req.headers.authorization.split(" ");
    const payload = await jwt.verify(token);

    const user = await User.findOne({
      where: { id: payload.user, authToken: token },
    });
    if (!user) {
      throw new appError("Unauthorized", 401);
    }
    req.auth = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authUser;
