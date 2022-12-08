const user = require('./user.controller');
const course = require('./course.controller');
const userCourse = require('./user.course.controller')
module.exports = {
  userCreate: user.create,
  userLogin: user.login,
  userGetAll: user.getAll,
  /* Course Controller*/
  courseCreate: course.create,
  courseGetAll: course.getAll,
  courseGetOne: course.getOne,
  courseUpdateOne: course.updateOne,
  courseDeleteOne: course.deleteOne,

  /* user_course controller */
  assignUserToCourse: userCourse.create,
  getAllCourseByUserId: userCourse.getAllCourseByUserId,
  getOneCourseByUserId: userCourse.getOneCourseByUserId,
  updateCourseStatusByUser: userCourse.updateCourseStatusByUser,
  getAllUserByCourseId: userCourse.getAllUserByCourseId,
};
