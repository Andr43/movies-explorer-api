const http2 = require('node:http2');

const {
  HTTP_STATUS_NOT_FOUND,
  HTTP_STATUS_BAD_REQUEST,
  HTTP_STATUS_INTERNAL_SERVER_ERROR,
  HTTP_STATUS_CREATED,
  HTTP_STATUS_UNAUTHORIZED,
  HTTP_STATUS_CONFLICT,
  HTTP_STATUS_FORBIDDEN,
} = http2.constants;

const regexLink = /https?:\/\/(w{1,3}\.)?[\w+\-._~:/?#[\]@!$&'()*+,;=]+/;
const regexRu = /[\W\d]/g;
const regexEn = /[\w\s\d\-._~:/?#[\]@!$&'()*+,;=]+/g;

module.exports = {
  HTTP_STATUS_NOT_FOUND,
  HTTP_STATUS_BAD_REQUEST,
  HTTP_STATUS_INTERNAL_SERVER_ERROR,
  HTTP_STATUS_CREATED,
  HTTP_STATUS_UNAUTHORIZED,
  HTTP_STATUS_CONFLICT,
  HTTP_STATUS_FORBIDDEN,
  regexLink,
  regexRu,
  regexEn,
};
