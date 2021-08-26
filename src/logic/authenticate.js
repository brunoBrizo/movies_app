/*
    {
        "created_by": "Bruno Brizolara",
        "created_at": "23/08/2021",
        "description": "receives a JWT and handles the validation",
        "modified_at": "26/08/2021"
    }
*/
const User = require("../models/user_model");
const jwt = require("./jwt");
const AppError = require("../utils/app_error");

const authenticate = async (req, res, next) => {
  try {
    //get token from incoming header "Bearer wecfdWEFwef234wF..."
    const [, token] = req.headers.authorization.split(" ");

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
    next(error);
  }
};

module.exports = authenticate;
