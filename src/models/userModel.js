const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

  // userId: {
  //   type: String,
  //   required: true
  // },
  avatar:{
    type:String,
    required:true
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
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
  inviteEmails:{
    type:Array,
    default:[]
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  },
  currentWatching: {
    type: Array,
    default: []
  },
  watchedVideos: {
    type: Array,
    default: []
  },
  watchLater: {
    type: Array,
    default: []
  },
  refreshToken: {
    type: String,
    default: ''
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
