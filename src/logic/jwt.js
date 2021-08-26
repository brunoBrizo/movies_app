/*
    {
        "created_by": "Bruno Brizolara",
        "created_at": "22/08/2021",
        "description": "JWT configuration and verification",
        "modified_at": "26/08/2021"
    }
*/
const jwt = require("jsonwebtoken");
const { jwt_config } = require("./config");
const AppError = require("../utils/app_error");

const sign = (payload) => {
  return jwt.sign(payload, jwt_config.secret, {
    expiresIn: jwt_config.expiresIn,
  });
};

const verify = async (token) => {
  try {
    return jwt.verify(token, jwt_config.secret);
  } catch (error) {
    throw new AppError("Unauthorized", 401);
  }
};

module.exports = {
  sign,
  verify,
};
