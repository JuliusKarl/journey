const express = require('express');
const router = express.Router();
const UsersController = require("../controllers/users");

// const User = require('../models/user');

// Get all existing users
router.get('/', UsersController.user_get_all);

// Create a new user
router.post('/signup' , UsersController.user_post_one);

// Create a new user
router.post('/check_email' , UsersController.user_check_email);

// Login a user
router.post('/login', UsersController.user_login);

// Find an existing user by userID
router.get('/:userId', UsersController.user_find_one)

// Delete an existing user by userId
// router.delete('/:userId', UsersController.user_delete_one);

module.exports = router;