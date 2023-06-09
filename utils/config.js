const { JWT_SECRET = '1cd788ce08225bf99275db7975d943f173406d91b5d5ac3fe020b2c890e1a108' } = process.env;
const DB_DEV = 'mongodb://127.0.0.1/projectmoviesdb';
module.exports = {
  JWT_SECRET,
  DB_DEV,
};
