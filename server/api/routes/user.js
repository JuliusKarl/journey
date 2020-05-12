const express = require('express');
const router = express.Router();
const UsersController = require("../controllers/users");
const checkAuth = require("../middleware/check-auth");

// Get all existing users
router.get('/', checkAuth, UsersController.user_get_all);

// Create a new user
router.post('/signup' , UsersController.user_post_one);

// Check Email
router.post('/check_email' , UsersController.user_check_email);

// Login a user
router.post('/login', UsersController.user_login);

// Find an existing user by userID
router.get('/find', checkAuth, UsersController.user_find_one)

// Delete an existing user by userId
router.delete('/:userId', UsersController.user_delete_one);

module.exports = router;