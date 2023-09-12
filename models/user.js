const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const UnauthorizedError = require('../errors/UnauthorizedError');
const { emailRegex } = require('../utils/constants');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Вы пропустили это поле.'],
    minlength: [2, 'Минимальное количество символов - 2.'],
    maxlength: [30, 'Максимальное количество символов - 30.'],
  },
  email: {
    type: String,
    required: [true, 'Вы пропустили это поле.'],
    unique: true,
    validate: {
      validator(email) {
        return emailRegex.test(email);
      },
      message: 'Неправильный email.',
    },
  },
  password: {
    type: String,
    required: [true, 'Вы пропустили это поле.'],
    select: false,
  },
}, { versionKey: false });

userSchema.statics.findUserByCredentials = async function findUserByCredentials(email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError('Неправильные почта или пароль.');
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthorizedError('Неправильные почта или пароль.');
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
