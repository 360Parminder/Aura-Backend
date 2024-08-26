const express = require('express');
const router = express.Router();
const multer = require('multer');
const { uploadVideos, downloadVideos } = require('../controllers/Video');

const upload = multer({ dest: '../Upload' });

router.post('/upload', upload.single('file'), uploadVideos);
router.get('/video/:videoName', downloadVideos);

module.exports = router;
