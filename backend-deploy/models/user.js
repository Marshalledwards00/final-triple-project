const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const UnauthorizedError = require('../errors/unauthorized-error')
const { MESSAGES } = require('../config/constants')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: 'Invalid email format',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
})

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password').then((user) => {
    if (!user) {
      throw new UnauthorizedError(MESSAGES.INVALID_AUTH)
    }

    return bcrypt.compare(password, user.password).then((isMatched) => {
      if (!isMatched) {
        throw new UnauthorizedError(MESSAGES.INVALID_AUTH)
      }

      return user
    })
  })
}

module.exports = mongoose.model('user', userSchema)
