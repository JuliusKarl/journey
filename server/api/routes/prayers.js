const express = require('express');
const router = express.Router();
const PrayersController = require("../controllers/prayers");

const Prayer = require('../models/prayer');

/** Get Prayers */
router.get('/', PrayersController.prayers_get_all);

module.exports = router;