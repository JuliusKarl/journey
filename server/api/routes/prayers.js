const express = require('express');
const router = express.Router();
const PrayersController = require("../controllers/prayers");

/** Find one user / Get all prayers */
router.get('/', PrayersController.prayers_get_all);

/** New prayer */
router.patch('/new/:userId', PrayersController.prayer_post_one);

/** Delete prayer */
router.delete('/:prayerId', PrayersController.prayer_delete_one);

module.exports = router;