const express = require('express');
const router = express.Router();
const meetingController = require('../controllers/meetingController');

router.post('/book', meetingController.bookAppointment);
router.get('/checkAvailability', meetingController.checkAvailability);

module.exports = router;