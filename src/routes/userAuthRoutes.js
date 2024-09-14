const express = require('express');
const {RegisterUser, RefreshAccessToken, LoginUser,GoogleLogin } = require('../controllers/userAuthController');


const router = express.Router();

router.post('/loginUser', LoginUser);
router.post('/registerUser',RegisterUser)
router.post('/googleLogin',GoogleLogin)
router.post('/refreshAccessToken',RefreshAccessToken)

module.exports = router;
