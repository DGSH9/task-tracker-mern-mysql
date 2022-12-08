const express = require('express');
const router = express.Router();
const controller = require('../controllers')
const { isAdmin } = require('../middleware/isAdmin')
const jwt = require('../middleware/jwt.validator')

router.get('/', (req, res) => {
  res.send('hello')
})

/* User Routes */
router
  .route('/user').get(jwt.decode, isAdmin, controller.userGetAll)
  .post(controller.userCreate)
  .put(controller.userLogin, jwt.encode)

/* Course Routes*/
router
  .route('/course')
  .post(jwt.decode, isAdmin, controller.courseCreate)
  .get(jwt.decode, isAdmin, controller.courseGetAll)

router
  .route('/course/:courseId')
  .get(jwt.decode, controller.courseGetOne)
  .put(jwt.decode, isAdmin, controller.courseUpdateOne)
  .delete(jwt.decode, isAdmin, controller.courseDeleteOne)

/* Course Assign Routes */
router
  .route('/assign/course')
  .post(jwt.decode, isAdmin, controller.assignUserToCourse)
router.route('/assigned/course').get(jwt.decode, controller.getAllCourseByUserId)


router.route('/assigned/course/by-course-id/:courseId').get(jwt.decode, controller.getAllUserByCourseId)

router
  .route('/assigned/course/:courseId').get(jwt.decode, controller.getOneCourseByUserId)
  .patch(jwt.decode, controller.updateCourseStatusByUser)

module.exports = router
