const express = require('express');
const router = express.Router();
const validateToken = require('../middleware/validateToken');
const { registerBusiness, loginBusiness,currentBusiness,createAd } = require('../controllers/businessController');

router.post('/register', registerBusiness);
router.post('/login', loginBusiness);
router.get('/current', validateToken, currentBusiness);
router.post('/createAd', validateToken, createAd);

module.exports = router;