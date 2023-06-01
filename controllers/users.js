const { DocumentNotFoundError, ValidationError } = require('mongoose').Error;
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-error');
const BadRequestError = require('../errors/bad-request-error');
// const StatusConflictError = require('../errors/status-conflict-error');
// const { JWT_SECRET } = require('../utils/config');

// const { NODE_ENV, JWT_SECRET_PROD } = process.env;

module.exports.getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Такого пользователя не существует.');
      }
      res.send(user);
    })
    .catch(next);
};

// module.exports.createUser = (req, res, next) => {
//   bcrypt.hash(req.body.password, 10)
//     .then((hash) => User.create({
//       name: req.body.name,
//       about: req.body.about,
//       avatar: req.body.avatar,
//       email: req.body.email,
//       password: hash,
//     }))
//     .then((user) => {
//       res.send(user);
//     })
//     .catch((err) => {
//       if (err.code === 11000) {
//         next(new StatusConflictError('Вы уже зарегистрированы.'));
//       } else if (err instanceof ValidationError) {
//         next(new BadRequestError('Переданные данные некорректны.'));
//       } else next(err);
//     });
// };

module.exports.updateUser = (req, res, next) => {
  const { name } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail()
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err instanceof DocumentNotFoundError) {
        next(new NotFoundError('Указанный пользователь не найден.'));
      } else if (err instanceof ValidationError) {
        next(new BadRequestError('Переданные данные некорректны.'));
      } else next(err);
    });
};

// module.exports.login = (req, res, next) => {
//   const { email, password } = req.body;
//   return User.findUserByCredentials(email, password)
//     .then((user) => {
//       const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET_PROD : JWT_SECRET, { expiresIn: '7d' });
//       res
//         .cookie('jwt', token, {
//           maxAge: 3600000 * 24 * 7,
//           httpOnly: true,
//         })
//         .send(user)
//         .end();
//     })
//     .catch((err) => {
//       if (err instanceof ValidationError) {
//         next(new BadRequestError('Вы указали неверный email или пароль.'));
//       } else next(err);
//     });
// };

// module.exports.signout = (req, res) => {
//   res.clearCookie('jwt').send({ message: 'Выход выполнен успешно.' });
// };
