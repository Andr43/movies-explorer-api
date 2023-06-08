const movieRouter = require('express').Router();
const {
  getMovies, createMovie, deleteMovie,
} = require('../controllers/movies');

const {
  createMovieValidator,
  movieIdValidator,
} = require('../validators/movieValidator');

movieRouter.get('/', getMovies);

movieRouter.delete('/:_id', movieIdValidator, deleteMovie);

movieRouter.post('/', createMovieValidator, createMovie);

module.exports = movieRouter;
