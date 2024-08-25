const express = require('express');
const { ProfileUser } = require('../controllers/userController');



const router = express.Router();

router.get('/profileUser', ProfileUser);

module.exports = router;
