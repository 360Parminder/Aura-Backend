const express = require('express');
const {addPlaylist} = require('../controllers/playList')


const router = express.Router();

router.post('/addVideo',addPlaylist)


module.exports = router;