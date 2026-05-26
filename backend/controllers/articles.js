const Article = require('../models/article')
const { HTTP_STATUS_CODES, MESSAGES } = require('../config/constants')
const ForbiddenError = require('../errors/forbidden-error')
const NotFoundError = require('../errors/not-found-error')

const getArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .sort({ createdAt: -1 })
    .then((articles) => res.send(articles))
    .catch(next)
}

const createArticle = (req, res, next) => {
  const {
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
  } = req.body

  Article.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner: req.user._id,
  })
    .then((article) => res.status(HTTP_STATUS_CODES.CREATED).send(article))
    .catch(next)
}

const deleteArticle = (req, res, next) => {
  Article.findById(req.params.articleId)
    .orFail(new NotFoundError(MESSAGES.ARTICLE_NOT_FOUND))
    .then((article) => {
      if (article.owner.toString() !== req.user._id) {
        throw new ForbiddenError(MESSAGES.FORBIDDEN_ARTICLE_DELETE)
      }

      return Article.findByIdAndDelete(req.params.articleId)
    })
    .then((article) => res.send(article))
    .catch(next)
}

module.exports = {
  getArticles,
  createArticle,
  deleteArticle,
}
