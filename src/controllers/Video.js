const { uploadVideo, getVideo } = require('../services/Video');

const uploadVideos = async (req, res) => {
  const file = req.file;


  if (!file || !req) {
    return res.status(400).send('File and video name are required');
  }

  try {
    const data = await uploadVideo(file, req);
    res.json({ data} );
  } catch (error) {
    res.status(500).send('Error uploading video');
  }
};

const downloadVideos = async (req, res) => {
  const { videoName } = req.params;

  try {
    const videoUrl = await getVideo(videoName);
    res.json({ videoUrl });
  } catch (error) {
    res.status(500).send('Error retrieving video');
  }
};

module.exports = {
  uploadVideos,
  downloadVideos,
};
