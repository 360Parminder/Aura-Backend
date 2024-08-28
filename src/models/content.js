const mongoose = require('mongoose');

const contentSchema  = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  genre: {
    type: [String], // Array of genres like ['Action', 'Drama']
    required: true,
  },
  releaseDate: {
    type: Date,
    // required: true,
  },
  rating: {
    type: Number, // e.g., 8.5/10
    min: 0,
    max: 10,
    default: 0,
  },
  cast: {
    type: [String], // Array of actor names
    // required: true,
  },
  videoUrl: {
    type: String, // URL to the video file (could be on S3, Firebase, etc.)
    // required: true,
  },
  thumbnailUrl: {
    type: String, // URL to the thumbnail image
    // required: true,
  },
  type: {
    type: String, // 'movie' or 'show'
    // required: true,
  },
  season: {
    type: Number, // Only for TV shows
  },
  episode: {
    type: Number, // Only for TV shows
  },
  duration: {
    type: String, // Duration of content (e.g., "2h 30m")
    // required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  totalChunks:{
    type:Number,
    default:0
  }
});



const Content = mongoose.model('Content', contentSchema);

module.exports = Content;
