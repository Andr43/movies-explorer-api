const movieRouter = require('express').Router();
const {
  getMovies, createMovie, deleteMovie,
} = require('../controllers/movies');

const {
  movieIdValidator, createMovieValidator,
} = require('../validators/movieValidator');

movieRouter.get('/', getMovies);

movieRouter.delete('/:_id', movieIdValidator, deleteMovie);

movieRouter.post('/', createMovieValidator, createMovie);

module.exports = movieRouter;