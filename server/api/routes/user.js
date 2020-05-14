const express = require('express');
const router = express.Router();
const UsersController = require("../controllers/users");

/** Get all existing users */
router.get('/', UsersController.user_get_all);

/** Create new user */
router.post('/signup' , UsersController.user_post_one);

/** Check email exists */
router.post('/check_email' , UsersController.user_check_email);

/** Log in an existing user */
router.post('/log_in', UsersController.user_login);

/** Find an existing user by id */
router.post('/find', UsersController.user_find_one)

/** Delete an existing user by userId */
router.delete('/:userId', UsersController.user_delete_one);

module.exports = router;