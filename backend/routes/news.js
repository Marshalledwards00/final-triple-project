const newsRouter = require('express').Router()
const { getGuardianNews } = require('../controllers/news')

newsRouter.get('/guardian', getGuardianNews)

module.exports = newsRouter
