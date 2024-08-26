const fs = require('fs');
const path = require('path');
const { bucket } = require('../utils/firebase');
const File = require('../models/Playlist');  // Assuming Playlist is your MongoDB model for storing video info

const uploadVideo = async (file, req) => {
    const { videoName } = req.body;
  try {
  await bucket.upload(file.path, {
      destination: `videos/${videoName}`,
      metadata: {
        contentType: file.mimetype,
      },
    });
    const downloadLink = await bucket.file(`videos/${videoName}`).getSignedUrl({
        action: 'read',
        expires: '03-17-2026',
        
      });
      // console.log(downloadLink);
    fs.unlinkSync(file.path);  // Remove file after upload

    const uploadedVideo = await File.create({
      videoName,
      videoUrl:downloadLink[0],
      videoThumbnail:downloadLink[0],  // Assuming you're using the same URL for the thumbnail
    });

    return {
        status: 'success',
        uploadedVideo,
    }
  } catch (error) {
    // console.error('Error uploading video:', error);
    throw error;
  }
};
const getVideo = async (videoName) => {
    try {
      const video = await File.findOne({ videoName });
      if (!video) {
        throw new Error('Video not found');
      }
      return{
        status: 'success',
        videName:video.videoName,
        videoUrl:video.videoUrl,
        videoThumbnail:video.videoThumbnail,
        videoQuality:video.videoQuality,
        videoCategory:video.videoCategory,
        videoViews: video.videoViews

      } 
    } catch (error) {
      console.error('Error retrieving video:', error);
      throw error;
    }
  };

module.exports = {
  uploadVideo,
  getVideo,
};
