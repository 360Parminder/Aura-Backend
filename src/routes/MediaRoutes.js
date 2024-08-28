const express = require('express')
const { DownloadVideo, UploadContent } = require('../controllers/MediaController')
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const router= express.Router()


router.post('/uploadContent', upload.single('videoFile'), UploadContent);
router.get('/downloadVideo', DownloadVideo);

module.exports= router