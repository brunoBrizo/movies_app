const User = require("../models/user_model");
const jwt = require("./jwt");
const AppError = require("../utils/app_error");

const authUser = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      throw new AppError("Unauthorized", 401);
    }
    //get token from incoming header "Bearer wecfdWEFwef234wF..."
    const [, token] = req.headers.authorization.split(" ");
    if (!token) {
      throw new AppError("Unauthorized", 401);
    }
    const payload = await jwt.verify(token);

    const user = await User.findOne({
      where: { id: payload.user, authToken: token },
    });
    if (!user) {
      throw new AppError("Unauthorized", 401);
    }
    req.auth = user;
    next();
  } catch (error) {
    if (error.message.includes("jwt")) {
      error = new AppError("Unauthorized", 401);
    }
    if (error.message.includes("invalid signature")) {
      error = new AppError("Unauthorized", 401);
    }
    next(error);
  }
};

module.exports = authUser;
