// Manages file uploads and storage for videos, thumbnails, and other media assets.

const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabaseUrl = 'https://ddssnypwehbglifwwlcs.supabase.co/';
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Function to upload video in chunks




const uploadVideo = async (req, res) => {
  const videoName = req.body.videoName;
  const videoPath = req.file.path; // path to the uploaded file

  if (!videoName && videoPath) {
    return {
      success: false,
      message: "Provide both Video Name & Video File"
    }
  }
  const bucketName = "videos";
  const chunkSize = 5 * 1024 * 1024; // 5MB chunk size

  // console.log(`Starting upload for ${videoName}`);

  const fileStream = fs.createReadStream(videoPath, { highWaterMark: chunkSize });
  let chunkIndex = 0;

  for await (const chunk of fileStream) {
    const { error } = await supabase
      .storage
      .from(bucketName)
      .upload(`${videoName}/chunk_${chunkIndex}`, chunk, {
        cacheControl: '3600',
        upsert: false,
        contentType: 'video/mp4',
      });

    if (error) {
      console.error('Error uploading chunk:', error.message);
      return {
        success: false,
        message: error.message
      }
    }

    console.log(`Uploaded chunk ${chunkIndex}`);
    chunkIndex++;
  }

  console.log('Video upload completed.');
  return {
    success: true,
    message: "Video upload completed"
  }
};

const downloadVideo = async (req,res) => {
  try {
    const { videoName, chunkIndex } = req.query;
    console.log(videoName,chunkIndex);
    
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
        error:error
      }
    }
    // console.log(data);
    res.setHeader('Content-Type', 'video/mp4');
    res.send({
      data,
      success:true
    })
    // return {
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
  uploadVideo,
  downloadVideo
}