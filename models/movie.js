const mongoose = require('mongoose');
const { urlRegex } = require('../utils/constants');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, 'Вы пропустили это поле.'],
  },
  director: {
    type: String,
    required: [true, 'Вы пропустили это поле.'],
  },
  duration: {
    type: Number,
    required: [true, 'Вы пропустили это поле.'],
  },
  year: {
    type: String,
    required: [true, 'Вы пропустили это поле.'],
  },
  description: {
    type: String,
    required: [true, 'Вы пропустили это поле.'],
  },
  image: {
    type: String,
    required: [true, 'Вы пропустили это поле.'],
    validate: {
      validator(url) {
        return urlRegex.test(url);
      },
      message: 'Неправильный URL.',
    },
  },
  trailerLink: {
    type: String,
    required: [true, 'Вы пропустили это поле.'],
    validate: {
      validator(url) {
        return urlRegex.test(url);
      },
      message: 'Неправильный URL.',
    },
  },
  thumbnail: {
    type: String,
    required: [true, 'Вы пропустили это поле.'],
    validate: {
      validator(url) {
        return urlRegex.test(url);
      },
      message: 'Неправильный URL.',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: [true, 'Вы пропустили это поле.'],
  },
  nameRU: {
    type: String,
    required: [true, 'Вы пропустили это поле.'],
  },
  nameEN: {
    type: String,
    required: [true, 'Вы пропустили это поле.'],
  },
}, { versionKey: false });

module.exports = mongoose.model('movie', movieSchema);
