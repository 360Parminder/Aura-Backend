const express = require('express');
const { RegisterAdmin, LoginAdmin } = require('../controllers/adminAuthController');


const router = express.Router();

router.post('/loginAdmin', LoginAdmin);
router.post('/registerAdmin',RegisterAdmin)
// router.post('/refreshAccessToken',RefreshAccessToken)

module.exports = router;