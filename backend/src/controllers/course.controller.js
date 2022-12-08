const { Course } = require('../models')

const create = async (req, res) => {
  try {
    const { title, description } = req.body

    await Course.create({
      title: title,
      description: description,
      admin_id: res.userId
    })
    return res.status(201).send({ message: 'course created successfully', success: true })
  } catch (e) {
    return res.status(400).send({ message: e.message, success: false })
  }
}
const getAll = async (req, res) => {
  try {
    const getAllData = await Course.findAll()
    res.status(200).send({ message: 'all course retrieved successfully', data: getAllData, success: true })
  } catch (e) {
    return res.status(400).send({ message: e.message, success: false })
  }
}
const getOne = async (req, res) => {
  try {
    const { courseId } = req.params
    const exist = await Course.findByPk(courseId)
    if (!exist) return res.send({ message: "Course not found", success: false })
    res.status(200).send({ message: 'course retrieved successfully', data: exist, success: true })
  } catch (e) {
    return res.status(400).send({ message: e.message, success: false })
  }
}

const updateOne = async (req, res) => {
  try {
    const { courseId } = req.params
    const { title, description } = req.body

    const exist = await Course.findByPk(courseId)
    if (!exist) return res.status(404).send({ message: "Course not found", success: false })
    await Course.update({ title: title, description: description }, { where: { id: courseId } })
    res.status(200).send({ message: 'Course updated successfully', success: true })
  } catch (e) {
    return res.status(400).send({ message: e.message, success: false })
  }
}
const deleteOne = async (req, res) => {
  try {
    const { courseId } = req.params
    const exist = await Course.findByPk(courseId)
    // console.log(exist)
    if (!exist) return res.status(404).send({ message: "Course not found", success: false })
    await Course.destroy({ where: { id: courseId } })
    res.send({ message: 'Course deleted successfully', success: true })
  } catch (e) {
    return res.status(400).send({ message: e.message, success: false })
  }
}

module.exports = {
  create,
  getAll,
  getOne,
  updateOne,
  deleteOne,
}
