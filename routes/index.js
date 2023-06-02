const router = require('express').Router();
const userRouter = require('./users');
const movieRouter = require('./movies');
const NotFoundError = require('../errors/not-found-error');
const {
  registration, login, signout,
} = require('../controllers/users');
const {
  registrationValidator,
  loginValidator,
} = require('../validators/userValidator');
const auth = require('../middlewares/auth');

router.post('/signup', registrationValidator, registration);
router.post('/signin', loginValidator, login);
router.use(auth);
router.use('/users', userRouter);
router.use('/movies', movieRouter);
router.use('/signout', signout);
router.use('*', (req, res, next) => {
  next(new NotFoundError('Запрашиваемый URL не существует.'));
});

module.exports = router;
