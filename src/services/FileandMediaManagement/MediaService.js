// Manages file uploads and storage for videos, thumbnails, and other media assets.

const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');
const content = require('../../models/content')

// Initialize Supabase client
const supabaseUrl = 'https://ddssnypwehbglifwwlcs.supabase.co/';
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Function to upload video in chunks




const uploadContent = async (req, res) => {
  const videoPath = req.file.path; // path to the uploaded file
  const { title, description, genre, releaseDate, cast, videoUrl, thumbnailUrl, type, season, episode, duration } = req.body

  if (!title && videoPath) {
    return {
      success: false,
      message: "Provide both Video Name & Video File"
    }
  }

  const videoExists = await content.findOne({ title })
  if (videoExists) {
    return {
      success: false,
      message: "Video already exists"
    }
  }
  const Content = await content.create({
    title,
    description,
    genre,
    releaseDate,
    cast,
    videoUrl,
    thumbnailUrl,
    type,
    season,
    episode,
    duration
  })
  
  if (!Content) {
    return {
      success: false,
      message: 'unable to upload video'
    }
  }

  const bucketName = "videos";
  const chunkSize = 10 * 1024 * 1024; // 5MB chunk size

  // console.log(`Starting upload for ${videoName}`);

  const fileStream = fs.createReadStream(videoPath, { highWaterMark: chunkSize });
  let chunkIndex = 0;

  for await (const chunk of fileStream) {
    const { error } = await supabase
      .storage
      .from(bucketName)
      .upload(`${title}/chunk_${chunkIndex}`, chunk, {
        cacheControl: '3600',
        upsert: false,
        contentType: 'video/mp4',
      });

    if (error) {
      const contentDeleted = content.findOneAndDelete({title})
      console.error('Error uploading chunk:', error.message);
      return {
        success: false,
        message: error.message
      }
    }

    console.log(`Uploaded chunk ${chunkIndex}`);
    chunkIndex++;
  }
  const totalChunks = chunkIndex
  const video = await content.findOneAndUpdate({ title }, { totalChunks: totalChunks })
  if (!video) {

    return {
      success: false,
      message: 'Video not found'
    }
  }
  console.log('Video upload completed.');
  return {
    success: true,
    message: "Video upload completed",
    totalChunks
  }
};

const downloadVideo = async (req, res) => {
  try {
    const { videoName, chunkIndex } = req.query;
    // console.log(videoName,chunkIndex);

    // const videoName ="testvideo"
    // const chunkIndex=0

    if (!videoName && chunkIndex) {
      return {
        success: false,
        message: 'provide Video Name & Video index'
      }
    }
    const { data, error } = await supabase
      .storage
      .from('videos')
      .download(`${videoName}/chunk_${chunkIndex}`);

    if (error) {
      return {
        success: false,
        message: "Error retrieving chunk",
        error: error
      }
    }
    // console.log(data);
    res.setHeader('Content-Type', 'video/mp4');
    res.send({
      data,
      success: true
    })
    console.log(data);

    // return {
    //   data,
    //   success: true,
    //   message: "File downloaded Successfully",
    // }

  } catch (error) {
    return {
      success: false,
      message: error.message
    }
  }
}

// Usage
// uploadVideoInChunks('path/to/your/video.mp4', 'your-bucket-name', 'video-name');

module.exports = {
  uploadContent,
  downloadVideo
}