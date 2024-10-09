const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

// Route to add a new user (without image upload)
router.post('/addNewUser', UserController.createUser);

// Route to get all users
router.get('/getAllUsers', UserController.getAllUsers);

// Route to get the latest users
router.get('/latestUsers', UserController.latestUsers);

// Route to get a user by ID
router.get('/:id', UserController.getUserById);

// Route to update a user by ID
router.put('/:id', UserController.updateUserById);

// Route to delete a user by ID
router.delete('/:id', UserController.deleteUserById);

module.exports = router;
