const express = require('express');
const router = express.Router();
const newsletterController = require('../controllers/newsletterController');

router.get('/categories', newsletterController.getCategories);
router.get('/users/by-category', newsletterController.getUsersByCategory);
router.post('/subscribe', newsletterController.subscribeUser);
router.post('/send-newsletter', newsletterController.sendNewsletter);

module.exports = router;
