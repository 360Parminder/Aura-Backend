const express = require('express');
const {AddContent} = require('../controllers/adminContent')


const router = express.Router();

router.post('/content/addContent',AddContent)


module.exports = router;