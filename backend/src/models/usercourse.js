'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserCourse extends Model {
    static associate(models) {
      // define association here
    }
  };
  UserCourse.init({
    user_id: DataTypes.INTEGER,
    course_id: DataTypes.INTEGER,
    admin_id: DataTypes.INTEGER,
    status: {
      type: DataTypes.ENUM("none", "to-do", "in-progress", "on-hold", "ready-for-review"),
      defaultValue: "none",
    },
  }, {
    sequelize,
    modelName: 'UserCourse',
  });
  return UserCourse;
};