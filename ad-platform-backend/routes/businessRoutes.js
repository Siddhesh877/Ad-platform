const express = require('express');
const router = express.Router();
const validateToken = require('../middleware/validateToken');
const { registerBusiness, loginBusiness,currentBusiness,createAd,getAds,deleteAd, updateAd } = require('../controllers/businessController');

router.post('/register', registerBusiness);
router.post('/login', loginBusiness);
router.get('/current', validateToken, currentBusiness);
router.post('/createAd', validateToken, createAd);
router.get('/getAds', validateToken, getAds);
router.delete('/deleteAd/:id', validateToken, deleteAd);
router.put('/updateAd/:id', validateToken, updateAd);

module.exports = router;