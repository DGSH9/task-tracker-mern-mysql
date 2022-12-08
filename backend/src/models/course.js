'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    static associate(models) {
      Course.belongsToMany(models.User, {
        through: 'UserCourse',
        as: 'users',
        foreignKey: 'course_id'
      });
    }
  };
  Course.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    admin_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Course',
  });
  return Course;
};
