const AppError = require('./app-error')
const { HTTP_STATUS_CODES } = require('../config/constants')

class UnauthorizedError extends AppError {
  constructor(message) {
    super(message, HTTP_STATUS_CODES.UNAUTHORIZED)
  }
}

module.exports = UnauthorizedError
