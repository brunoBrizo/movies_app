const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database/sequelize");

class User extends Model {}
User.init(
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Email must not be empty",
        },
        max: {
          args: 250,
          msg: "Email max length is 250 characters",
        },
      },
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Firstname must not be empty",
        },
        max: {
          args: 100,
          msg: "Firstname max length is 100 characters",
        },
      },
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Lastname must not be empty",
        },
        max: {
          args: 100,
          msg: "Lastname max length is 100 characters",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Password must not be empty",
        },
        max: {
          args: 1000,
          msg: "Password max length is 1000 characters",
        },
      },
    },
    authToken: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "user",
    timestamps: true,
  }
);

module.exports = User;
