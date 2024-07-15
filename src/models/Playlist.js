const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  // videoId: {
  //   type: String,
  //   required: true,
  // },
  videoName: {
    type: String,
    required: true,
    unique: true,
  },
  videoQuality: {
    type: String,
    default:'144p',
    // required: true,
    enum: ['144p', '360p', '720p', '1080p']
  },
  videoUrl: {
    type: String,
    default:" ",
    required: true,
  },
  videoViews: {
    type: Number,
    default: 0,
  },
  videoLikes: {
    type: Number,
    default: 0,
  },
  videoDislikes: {
    type: Number,
    default: 0,
  },
  videoComments: {
    type: Number,
    default: 0,
  },
  videoDuration: {
    type: Number,
    default: 0,
  },
  videoDate: {
    type: Date,
    default: Date.now,
  },
  videoDescription: {
    type: String,
    default: '',
  },
  videoThumbnail: {
    type: String,
    default: '',
  },
  videoCategory: {
    type: String,
    default: 'movie',
    enum:['movie','webseries']
  },


});

const playList = mongoose.model('playList', userSchema);

module.exports = playList;
