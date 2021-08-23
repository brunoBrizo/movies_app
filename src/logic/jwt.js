const jwt = require("jsonwebtoken");
const { jwt_config } = require("./config");

const sign = (payload) => {
  return jwt.sign(payload, jwt_config.secret, {
    expiresIn: jwt_config.expiresIn,
  });
};

const verify = (token) => {
  return jwt.verify(token, jwt_config.secret);
};

module.exports = {
  sign,
  verify,
};
