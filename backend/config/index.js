const { DEFAULT_DEV_JWT_SECRET, DEFAULT_DEV_DB_URL } = require('./development')

const {
  NODE_ENV,
  PORT = 3000,
  JWT_SECRET,
  MONGO_URL,
  SMTP_HOST,
  SMTP_PORT,
  SMTP_SECURE,
  SMTP_USER,
  SMTP_PASS,
  SMTP_FROM,
} = process.env

const isProduction = NODE_ENV === 'production'

const config = {
  port: Number(PORT),
  isProduction,
  jwtSecret: isProduction ? JWT_SECRET : (JWT_SECRET || DEFAULT_DEV_JWT_SECRET),
  mongoUrl: isProduction ? MONGO_URL : (MONGO_URL || DEFAULT_DEV_DB_URL),
  mail: {
    host: SMTP_HOST || 'smtp.gmail.com',
    port: Number(SMTP_PORT || 587),
    secure: SMTP_SECURE === 'true',
    user: SMTP_USER,
    pass: SMTP_PASS,
    from: SMTP_FROM || SMTP_USER,
  },
}

module.exports = config
