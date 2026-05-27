const router = require('express').Router()
const { celebrate } = require('celebrate')
const usersRouter = require('./users')
const articlesRouter = require('./articles')
const newsRouter = require('./news')
const { createUser, login, requestPasswordReset } = require('../controllers/users')
const auth = require('../middlewares/auth')
const requireDb = require('../middlewares/require-db')
const { signUpSchema, signInSchema, resetPasswordSchema } = require('../validators/auth')
const NotFoundError = require('../errors/not-found-error')
const { MESSAGES } = require('../config/constants')

router.post('/signup', celebrate(signUpSchema), requireDb, createUser)
router.post('/signin', celebrate(signInSchema), requireDb, login)
router.post('/reset-password', celebrate(resetPasswordSchema), requireDb, requestPasswordReset)
router.use('/news', newsRouter)

router.use(requireDb)
router.use(auth)
router.use('/users', usersRouter)
router.use('/articles', articlesRouter)

router.use('*', (req, res, next) => {
  next(new NotFoundError(MESSAGES.ROUTE_NOT_FOUND))
})

module.exports = router
