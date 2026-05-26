const { Joi } = require('celebrate')

const articleBodySchema = {
  body: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
    date: Joi.string().required(),
    source: Joi.string().required(),
    link: Joi.string().uri().required(),
    image: Joi.string().uri().required(),
  }),
}

const articleIdSchema = {
  params: Joi.object().keys({
    articleId: Joi.string().hex().length(24).required(),
  }),
}

module.exports = {
  articleBodySchema,
  articleIdSchema,
}
