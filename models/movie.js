const mongoose = require('mongoose');
const { Schema } = mongoose;
const { regexLink, regexRu, regexEn } = require('../utils/constants');

const movieSchema = new Schema(
  {
    country: {
      type: String,
      minlength: 2,
      required: true,
    },
    director: {
      type: String,
      minlength: 2,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    year: {
      type: String,
      minlength: 2,
      required: true,
    },
    description: {
      type: String,
      minlength: 2,
      required: true,
    },
    image: {
      type: String,
      minlength: 2,
      required: true,
      validate: {
        validator(v) {
          return regexLink.test(v);
        },
        message: (props) => `${props.value} не является ссылкой!`,
      },
    },
    trailerLink: {
      type: String,
      minlength: 2,
      required: true,
      validate: {
        validator(v) {
          return regexLink.test(v);
        },
        message: (props) => `${props.value} не является ссылкой!`,
      },
    },
    thumbnail: {
      type: String,
      minlength: 2,
      required: true,
      validate: {
        validator(v) {
          return regexLink.test(v);
        },
        message: (props) => `${props.value} не является ссылкой!`,
      },
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    movieId : {
      type: Number,
      required: true,
    },
    nameRU: {
      type: String,
      minlength: 2,
      required: true,
      validate: {
        validator(v) {
          return regexRu.test(v);
        },
        message: (props) => `В ${props.value} не используются кириллические буквы!`,
      },
    },
    nameEN: {
      type: String,
      minlength: 2,
      required: true,
      validate: {
        validator(v) {
          return regexEn.test(v);
        },
        message: (props) => `В ${props.value} не используются латинские буквы!`,
      },
    },
  },
  { toJSON: { useProjection: true }, toObject: { useProjection: true }, versionKey: false },
);

module.exports = mongoose.model('movie', movieSchema);