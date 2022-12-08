const { User } = require('../models')

const isAdmin = async (req, res, next) => {
  try {
    const userId = res.userId;
    const exist = await User.findOne({ where: { id: userId, role: "admin" } })
    if (!exist) return res.status(403).send({ message: 'only admins are allowed to access' })
    next()
  } catch (e) {
    return res.status(400).send({ message: e.message, success: false })
  }
}

module.exports = {
  isAdmin
}
