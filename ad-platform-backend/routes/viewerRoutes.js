const express = require('express');
const router = express.Router();
const validateToken = require('../middleware/validateToken');
const { registerViewer, loginViewer, currentViewer, getAllAds, getTargetedAds} = require('../controllers/viewerController');

router.post('/register', registerViewer);
router.post('/login', loginViewer);
router.get('/current', validateToken, currentViewer);
router.get('/getAllAds', validateToken, getAllAds);
router.get('/getTargetedAds', validateToken, getTargetedAds);

module.exports = router;
