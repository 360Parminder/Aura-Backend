const express = require('express')
const { UploadVideo, DownloadVideo } = require('../controllers/MediaController')
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const router= express.Router()


router.post('/uploadVideo', upload.single('videoFile'), UploadVideo);
router.post('/downloadVideo', DownloadVideo);

module.exports= router