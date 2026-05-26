const router = require('express').Router()
const { celebrate } = require('celebrate')
const usersRouter = require('./users')
const articlesRouter = require('./articles')
const newsRouter = require('./news')
const { createUser, login, requestPasswordReset } = require('../controllers/users')
const auth = require('../middlewares/auth')
const { signUpSchema, signInSchema, resetPasswordSchema } = require('../validators/auth')
const NotFoundError = require('../errors/not-found-error')
const { MESSAGES } = require('../config/constants')

router.post('/signup', celebrate(signUpSchema), createUser)
router.post('/signin', celebrate(signInSchema), login)
router.post('/reset-password', celebrate(resetPasswordSchema), requestPasswordReset)
router.use('/news', newsRouter)

router.use(auth)
router.use('/users', usersRouter)
router.use('/articles', articlesRouter)

router.use('*', (req, res, next) => {
  next(new NotFoundError(MESSAGES.ROUTE_NOT_FOUND))
})

module.exports = router
