const userRouter = require('express').Router();
const {
  updateUser, getUserInfo,
} = require('../controllers/users');

const {
  updateUserValidator,
} = require('../validators/userValidator');

userRouter.get('/me', getUserInfo);

userRouter.patch('/me', updateUserValidator, updateUser);

module.exports = userRouter;
