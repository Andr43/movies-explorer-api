const { celebrate, Joi } = require('celebrate');
const { regexLink, regexRu, regexEn } = require('../utils/constants');

const createMovieValidator = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().min(2),
    director: Joi.string().required().min(2),
    duration: Joi.number().required(),
    year: Joi.string().required().min(2),
    description: Joi.string().required().min(2),
    image: Joi.string().required().min(2).regex(regexLink),
    trailerLink: Joi.string().required().min(2).regex(regexLink),
    thumbnail: Joi.string().required().min(2).regex(regexLink),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required().min(2).regex(regexRu),
    nameEN: Joi.string().required().min(2).regex(regexEn),
  }),
});

const movieIdValidator = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().hex().length(24).required(),
  }),
});

module.exports = {
  createMovieValidator,
  movieIdValidator,
};
