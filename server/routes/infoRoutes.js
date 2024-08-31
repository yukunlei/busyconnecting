const express = require('express');
const router = express.Router();
const upload = require('multer')();
const infoController = require('../controllers/infoController');

router.get('/:page', infoController.getInfoPage);
router.put('/:page', upload.fields([{ name: 'image1' }, { name: 'image2' }, { name: 'image3' }]), infoController.updateInfoPage);

module.exports = router;
