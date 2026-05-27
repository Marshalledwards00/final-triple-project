const newsRouter = require('express').Router()
const { getGuardianNews, getNewsApiNews } = require('../controllers/news')

newsRouter.get('/guardian', getGuardianNews)
newsRouter.get('/newsapi', getNewsApiNews)

module.exports = newsRouter
