const express = require('express');
const router = express.Router();
const UsersController = require("../controllers/user");

/** Users */
/** Get all existing users */
router.get('/', UsersController.user_get_all);

/** Create new user */
router.post('/signup' , UsersController.user_post_one);

/** Check email exists */
router.post('/check_email' , UsersController.user_check_email);

/** Log in existing user */
router.post('/log_in', UsersController.user_login);

/** Find existing user by id */
router.post('/find', UsersController.user_find_one)

/** Delete existing user by userId */
router.delete('/:userId', UsersController.user_delete_one);


/** Prayers */
/** Add new prayer */
router.patch('/prayer/new/', UsersController.prayer_add_one);

/**  Edit prayer */
router.patch('/prayer/edit/', UsersController.prayer_patch_one);

/** Delete prayer */
router.patch('/prayer/remove/', UsersController.prayer_patch_one_remove);

/** Find prayer */
router.post('/prayer/find', UsersController.prayer_find_one)


/** Devotionals */
/** Add new devotional */
router.patch('/devotional/new/', UsersController.devotional_add_one);

/** Edit devotional */
router.patch('/devotional/edit/', UsersController.devotional_patch_one);

/** Delete devotional */
router.patch('/devotional/remove/', UsersController.devotional_patch_one_remove);

/** Find devotional */
router.post('/devotional/find', UsersController.devotional_find_one)


module.exports = router;