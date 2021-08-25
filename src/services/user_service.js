const User = require("../models/user_model");
const bcrypt = require("bcrypt");
const jwt = require("../logic/jwt");
const AppError = require("../utils/app_error");
const validator = require("email-validator");
const Sequelize = require("sequelize");

async function getUsers() {
  try {
    const users = await User.findAll();
    return users;
  } catch (error) {
    _errorHandler(error);
  }
}

async function getUserById(userId) {
  try {
    const user = await User.findOne({ where: { id: userId } });
    if (user) return _cleanUserReturn(user);
    else return null;
  } catch (error) {
    _errorHandler(error);
  }
}

async function insertUser(user) {
  try {
    //validations
    _userInsertValidator(user);
    var hash = await bcrypt.hash(user.password, 10);
    user.password = hash;
    let userCreated = await User.create(user);
    if (!userCreated) {
      throw new AppError("User not created", 500);
    } else {
      const token = jwt.sign({ user: userCreated.id });
      userCreated.authToken = token;
      await userCreated.save();
      user = _cleanUserReturn(userCreated);
      const newUser = {
        user,
        token,
      };
      return newUser;
    }
  } catch (error) {
    await _errorHandler(error);
  }
}

async function login(userEmail, userPwd) {
  try {
    await _userLoginValidator(userEmail, userPwd);
    let result = await User.findOne({
      where: { email: userEmail },
    });
    if (!result) {
      throw new AppError("Invalid credentials", 401);
    } else {
      const match = await bcrypt.compare(userPwd, result.password);
      if (match) {
        const token = jwt.sign({ user: result.id });
        result.authToken = token;
        await result.save();
        const user = _cleanUserReturn(result);
        const response = {
          user,
          token,
        };
        return response;
      } else {
        throw new AppError("Invalid credentials", 401);
      }
    }
  } catch (error) {
    await _errorHandler(error);
  }
}

async function logout(user) {
  try {
    user.authToken = null;
    await user.save();
    return true;
  } catch (error) {
    await _errorHandler(error);
  }
}

module.exports = {
  getUsers,
  getUserById,
  insertUser,
  login,
  logout,
};

_cleanUserReturn = (user) => {
  const { password, updatedAt, createdAt, authToken, ...result } =
    user.toJSON();
  return result;
};

_userInsertValidator = async (user) => {
  let errorMsg;
  let validUser = true;
  validEmail = validator.validate(user.email);
  if (!validEmail) {
    validUser = false;
    errorMsg = "Email is invalid";
  }
  if (validUser) {
    const auxUser = await User.findOne({ where: { email: user.email } });
    if (auxUser) {
      validUser = false;
      errorMsg = "Email is already in use";
    }
  }
  if (validUser && !user.firstname) {
    validUser = false;
    errorMsg = "Firstname must not be empty";
  }
  if (validUser && !user.lastname) {
    validUser = false;
    errorMsg = "Lastname must not be empty";
  }
  if (validUser && !user.password) {
    validUser = false;
    errorMsg = "Password must not be empty";
  }
  if (validUser && user.password.length < 5) {
    validUser = false;
    errorMsg = "Password must have at least 5 characters";
  }
  if (!validUser) {
    throw new AppError(errorMsg, 400);
  }
  return true;
};

_userLoginValidator = (userEmail, userPwd) => {
  let errorMsg = "";
  let validUser = true;
  let validEmail = true;

  if (!userEmail) {
    validUser = false;
    errorMsg = "Email must not be empty";
  }

  validEmail = validator.validate(userEmail);
  if (validUser && !validEmail) {
    validUser = false;
    errorMsg = "Email is invalid";
  }
  if (validUser && !userPwd) {
    validUser = false;
    errorMsg = "Password must not be empty";
  }

  if (!validUser) {
    throw new AppError(errorMsg, 400);
  }
  return true;
};

async function _errorHandler(error) {
  let msg, status;
  if (error instanceof Sequelize.Error) {
    if (error.errors.length > 0) {
      msg = error.errors[0].message;
      status = 400;
    } else {
      status = 500;
      msg = "Server unavailable";
    }
    throw new AppError(msg, status);
  }

  throw error;
}
