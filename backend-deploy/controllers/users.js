const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const config = require('../config')
const { HTTP_STATUS_CODES, MESSAGES } = require('../config/constants')
const ConflictError = require('../errors/conflict-error')
const NotFoundError = require('../errors/not-found-error')

const createUser = (req, res, next) => {
  const { name, email, password } = req.body

  bcrypt.hash(password, 10)
    .then((hash) => User.create({ name, email, password: hash }))
    .then((user) => {
      const sanitizedUser = {
        _id: user._id,
        name: user.name,
        email: user.email,
      }
      res.status(HTTP_STATUS_CODES.CREATED).send(sanitizedUser)
    })
    .catch((error) => {
      if (error.code === 11000) {
        next(new ConflictError(MESSAGES.DUPLICATE_EMAIL))
        return
      }
      next(error)
    })
}

const login = (req, res, next) => {
  const { email, password } = req.body

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, config.jwtSecret, { expiresIn: '7d' })
      res.send({ token })
    })
    .catch(next)
}

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new NotFoundError(MESSAGES.USER_NOT_FOUND))
    .then((user) => {
      res.send({
        _id: user._id,
        name: user.name,
        email: user.email,
      })
    })
    .catch(next)
}

const requestPasswordReset = (req, res, next) => {
  const { email, newPassword } = req.body

  User.findOne({ email })
    .orFail(new NotFoundError(MESSAGES.USER_NOT_FOUND))
    .then((user) => {
      return bcrypt.hash(newPassword, 10)
        .then((hash) => {
          user.password = hash
          return user.save()
        })
    })
    .then(() => {
      res.status(HTTP_STATUS_CODES.OK).send({ message: MESSAGES.PASSWORD_RESET_SUCCESS })
    })
    .catch(next)
}

module.exports = {
  createUser,
  login,
  getCurrentUser,
  requestPasswordReset,
}
