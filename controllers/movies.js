const { DocumentNotFoundError, CastError, ValidationError } = require('mongoose').Error;
const Movie = require('../models/movie');
const {
  HTTP_STATUS_CREATED,
} = require('../utils/constants');
const NotFoundError = require('../errors/not-found-error');
const BadRequestError = require('../errors/bad-request-error');
const StatusForbiddenError = require('../errors/status-forbidden-error');

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .populate(['owner'])
    .then((movies) => res.send(movies))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  const { _id: userId } = req.user;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: userId,
  })
    .then((movie) => {
      res.status(HTTP_STATUS_CREATED).send(movie);
    })
    .catch((err) => {
      if (err instanceof ValidationError) {
        next(new BadRequestError('Переданные данные некорректны.'));
      } else next(err);
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params._id)
    .orFail()
    .then((movie) => {
      if (req.user._id !== movie.owner.toHexString()) {
        throw new StatusForbiddenError('Вы не имеете достаточных прав, чтобы удалить данный фильм.');
      } else {
        Movie.deleteOne(movie)
          .then(() => {
            res.send({ message: 'Ваш фильм удален.' });
          });
      }
    })
    .catch((err) => {
      if (err instanceof DocumentNotFoundError) {
        next(new NotFoundError('Фильма с таким id не существует.'));
      } else if (err instanceof CastError) {
        next(new BadRequestError('Запрашиваемый фильм не найден.'));
      } else next(err);
    });
};
