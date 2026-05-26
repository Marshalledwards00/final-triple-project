const articlesRouter = require('express').Router()
const { celebrate } = require('celebrate')
const { getArticles, createArticle, deleteArticle } = require('../controllers/articles')
const { articleBodySchema, articleIdSchema } = require('../validators/article')

articlesRouter.get('/', getArticles)
articlesRouter.post('/', celebrate(articleBodySchema), createArticle)
articlesRouter.delete('/:articleId', celebrate(articleIdSchema), deleteArticle)

module.exports = articlesRouter
