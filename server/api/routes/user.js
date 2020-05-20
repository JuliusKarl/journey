const express = require('express');
const router = express.Router();
const UsersController = require("../controllers/user");

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

/** Add new prayer */
router.patch('/prayer/new/:userId', UsersController.user_patch_one);

/** Remove new prayer */
router.patch('/prayer/remove/:userId', UsersController.user_patch_one_remove);

/** Find a prayer */
router.post('/prayer/find/:prayerId', UsersController.prayer_find_one)

/** Delete an existing user by userId */
router.delete('/:userId', UsersController.user_delete_one);

module.exports = router;