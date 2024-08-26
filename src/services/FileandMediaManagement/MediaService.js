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
    const bucketName = "videos";
    const chunkSize = 5 * 1024 * 1024; // 5MB chunk size
  
    console.log(`Starting upload for ${videoName}`);
  
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
        res.status(500).send(`Error uploading chunk ${chunkIndex}: ${error.message}`);
        return;
      }
  
      console.log(`Uploaded chunk ${chunkIndex}`);
      chunkIndex++;
    }
  
    console.log('Video upload completed.');
    res.status(200).send('Video upload completed.');
  };

 const downloadVideo =async()=>{
    try {
    // const { videoName, chunkIndex } = req.params;

  // Fetch chunk from Supabase
  const videoName="testvideo"
  chunkIndex=2
  const { data, error } = await supabase
    .storage
    .from('videos')
    .download(`${videoName}/chunk_${chunkIndex}`);

  if (error) {
    res.status(500).send('Error retrieving chunk');
    return;
  }
  console.log(data);
  
    } catch (error) {
        
    }
 } 

// Usage
// uploadVideoInChunks('path/to/your/video.mp4', 'your-bucket-name', 'video-name');

module.exports={
    uploadVideo,
    downloadVideo
}