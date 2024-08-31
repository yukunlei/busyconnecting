const express = require('express');
const router = express.Router();
const upload = require('multer')();
const homeController = require('../controllers/homeController');

router.get('/', homeController.getHomePage);
router.put('/', upload.single('Image'), homeController.updateHomePage);

// Add other home routes here

module.exports = router;
