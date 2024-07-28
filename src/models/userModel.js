const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    // required: true
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  },
  accessToken: {
    type: String,
    default: ''

  },
  refreshToken: {
    type: String,
    default: ''
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
