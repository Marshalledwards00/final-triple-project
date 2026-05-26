const jwt = require('jsonwebtoken')
const config = require('../config')
const UnauthorizedError = require('../errors/unauthorized-error')
const { MESSAGES } = require('../config/constants')

const auth = (req, res, next) => {
  const { authorization } = req.headers

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new UnauthorizedError(MESSAGES.AUTH_REQUIRED))
    return
  }

  const token = authorization.replace('Bearer ', '')

  try {
    const payload = jwt.verify(token, config.jwtSecret)
    req.user = payload
    next()
  } catch {
    next(new UnauthorizedError(MESSAGES.AUTH_REQUIRED))
  }
}

module.exports = auth
