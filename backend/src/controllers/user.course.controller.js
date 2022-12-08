const { Course, User, UserCourse } = require('../models')

const create = async (req, res) => {
  try {
    const { userId, courseId } = req.body
    const existUser = await User.findOne({ where: { id: userId, role: "trainee" } })
    if (!existUser) return res.send({ message: 'user not found', success: false })
    const existCourse = await Course.findOne({ where: { id: courseId } })
    if (!existCourse) return res.send({ message: 'course not found', success: false })
    const existuserCourse = await UserCourse.findOne({
      where: { user_id: userId, course_id: courseId },
    })
    if (existuserCourse)
      return res.send({ message: 'user have assigned to this course already', success: false })
    await UserCourse.create({ user_id: userId, course_id: courseId, admin_id: res.userId })
    return res.status(200).send({
      message: 'course assigned to user successfully', success: true
    })
  } catch (e) {
    return res.status(400).send({ message: e.message, success: false })
  }
}
const getOneCourseByUserId = async (req, res) => {
  try {
    const { courseId } = req.params
    const userId = res.userId
    const existuserCourse = await UserCourse.findOne({
      where: { user_id: userId, course_id: courseId },
    })
    if (!existuserCourse)
      return res
        .status(404)
        .send({ message: 'user is not associated with this course', success: false })
    const getOneData = await Course.findByPk(courseId)
    return res
      .status(200)
      .send({
        message: 'Trainee_course retrieved successfully',
        data: getOneData,
        success: true
      })
  } catch (e) {
    return res.status(400).send({ message: e.message, success: false })
  }
}



const getAllUserByCourseId = async (req, res) => {
  try {

    const userId = res.userId
    const { courseId } = req.params;
    // console.log('===============', courseId);
    const existCourse = await User.findByPk(courseId)
    if (!existCourse) return res.send('course not found')


    const data = await Course.findByPk(courseId, {
      include: [
        {
          model: User,
          as: 'users',
          attributes: ['id', 'fullName', 'email', 'createdAt'],
        },
      ],
      order: [[{ model: User, as: 'users' }, 'createdAt', 'ASC']],
    })
    let { id, title, description, users } = data;
    // console.log(users);

    users = users.map((x) => {
      return { id: x.id, fullName: x.fullName, email: x.email, status: x.UserCourse.status, createdAt: x.createdAt }
    })
    const getAllData = { id, title, description, users }
    res
      .status(200)
      .send({ message: 'All assigned trainee retrieve successfully', data: getAllData, success: true })


  } catch (e) {
    return res.status(400).send({ message: e.message, success: false })
  }
}



const getAllCourseByUserId = async (req, res) => {
  try {
    const userId = res.userId
    const existUser = await User.findByPk(userId)
    if (!existUser) return res.send('user not found')

    const data = await User.findByPk(userId, {
      include: [
        {
          model: Course,
          as: 'courses',
          attributes: ['id', 'title', 'description'],
        },
      ],
      order: [[{ model: Course, as: 'courses' }, 'createdAt', 'ASC']],
    })

    let { id, fullName, email, courses } = data
    courses = courses.map((x) => {
      return { id: x.id, title: x.title, description: x.description, status: x.UserCourse.status }
    })
    const getAllData = { id, fullName, email, courses }
    res
      .status(200)
      .send({ message: 'Course retrieved successfully', data: getAllData, success: true })
  } catch (e) {
    return res.status(400).send({ message: e.message, success: false })
  }
}

const updateCourseStatusByUser = async (req, res) => {
  try {
    const { courseId } = req.params
    const { status } = req.body
    const userId = res.userId
    const existuserCourse = await UserCourse.findOne({
      where: { user_id: userId, course_id: courseId },
    })
    if (!existuserCourse)
      return res
        .status(404)
        .send({ message: 'user is not associated with this course', success: false })

    await UserCourse.update({ status: status }, { where: { user_id: userId, course_id: courseId } })
    return res.status(200).send({ message: 'status updated successfully', success: true })
  } catch (e) {
    return res.status(400).send({ message: e.message, success: false })
  }
}
module.exports = {
  create,
  getAllCourseByUserId,
  getOneCourseByUserId,
  updateCourseStatusByUser,
  getAllUserByCourseId

}
