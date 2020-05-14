const express = require('express');
const router = express.Router();
const DevotionalController = require("../controllers/devotional");

const Devotional = require('../models/devotional');

/** Get Devotional */
router.get('/', DevotionalController.devotional_get_one);

module.exports = router;