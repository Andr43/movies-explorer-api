const { celebrate, Joi } = require('celebrate');

const updateUserValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
  }),
});

module.exports = {
  updateUserValidator,
};