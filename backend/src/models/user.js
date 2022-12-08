"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsToMany(models.Course, {
        through: "UserCourse",
        as: "courses",
        foreignKey: "user_id",
      });
    }
  }
  User.init(
    {
      fullName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      role: {
        type: DataTypes.ENUM("trainee", "admin"),
        defaultValue: "trainee",
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
