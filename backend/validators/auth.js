const { Joi } = require('celebrate')

const signUpSchema = {
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  }),
}

const signInSchema = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
}

const resetPasswordSchema = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    newPassword: Joi.string().min(6).required(),
  }),
}

module.exports = {
  signUpSchema,
  signInSchema,
  resetPasswordSchema,
}
