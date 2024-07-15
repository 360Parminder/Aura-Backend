const express = require('express');
const { getUsers,RegisterUser } = require('../controllers/userController');


const router = express.Router();

router.get('/users', getUsers);
router.post('/userRegister',RegisterUser)

module.exports = router;
