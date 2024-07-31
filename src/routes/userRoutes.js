const express = require('express');
const { getUsers,RegisterUser, RefreshAccessToken } = require('../controllers/userController');


const router = express.Router();

router.post('/users', getUsers);
router.post('/userRegister',RegisterUser)
router.post('/refreshAccessToken',RefreshAccessToken)

module.exports = router;
