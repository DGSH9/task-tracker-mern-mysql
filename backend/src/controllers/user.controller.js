const { User, Course } = require('../models')
const bcrypt = require('bcryptjs');


const create = async (req, res) => {
  try {
    const { fullName, email, password, role } = req.body
    // encrypt password
    const user = await User.findOne({ where: { email: email } });
    if (user) {
      return res.status(400).send({ message: 'User already present', success: false });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    if (!hashedPassword) {
      const error = new Error('Password unable to encypt');
      error.statusCode = 404
      // error.data = errors.array();
      throw error;
    }
    // encrypt password

    await User.create({
      fullName: fullName,
      email: email,
      password: hashedPassword,
      role: role,
    })
    return res
      .status(201)
      .send({ message: 'user has been registered successfully', success: true })
  } catch (e) {
    return res.status(400).send({ message: e.message, success: false })
  }
}





const login = async (req, res, next) => {
  try {
    const { email, password } = req.body

    //decrypt password
    const user = await User.findOne({ where: { email: email } })
    if (!user) return res.status(404).send({ message: 'please sign up first' })
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      const error = new Error('You enter incorrect password')
      error.statusCode = 401;
      throw error;
    }
    //decrypt password

    const exist = await User.findOne({
      attributes: ['id', 'fullName', 'email', 'role'],
      // where: { email: email, password: password },
      where: { email: email },
    })
    // if (!exist)
    //   return res
    //     .status(404)
    //     .send({ message: 'please sign up first', success: false })
    res.user = exist
    next()
  } catch (e) {
    return res.status(400).send({ message: e.message, success: false })
  }
}





const getAll = async (req, res) => {
  try {
    const allTrainee = await User.findAll({ where: { role: 'trainee' } })
    return res
      .status(200)
      .send({
        message: 'All trainees retrieved successfully',
        data: allTrainee,
        success: true,
      })
  } catch (e) {
    return res.status(400).send({ message: e.message, success: false })
  }
}
module.exports = { create, login, getAll }
