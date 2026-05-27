const HTTP_STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  SERVICE_UNAVAILABLE: 503,
  SERVER_ERROR: 500,
}

const MESSAGES = {
  USER_NOT_FOUND: 'User not found',
  ARTICLE_NOT_FOUND: 'Article not found',
  FORBIDDEN_ARTICLE_DELETE: 'You cannot delete another user\'s article',
  INVALID_AUTH: 'Incorrect email or password',
  AUTH_REQUIRED: 'Authorization required',
  INVALID_DATA: 'Invalid data provided',
  DUPLICATE_EMAIL: 'A user with this email already exists',
  PASSWORD_RESET_SUCCESS: 'Password was reset successfully. You can now sign in.',
  DATABASE_UNAVAILABLE: 'Account services are temporarily unavailable. Please try again soon.',
  ROUTE_NOT_FOUND: 'Requested resource was not found',
  SERVER_ERROR: 'An error has occurred on the server',
}

module.exports = {
  HTTP_STATUS_CODES,
  MESSAGES,
}
