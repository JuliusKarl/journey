const express = require('express');
const router = express.Router();
const DevotionalController = require("../controllers/devotional");

const Devotional = require('../models/devotional');

// Get devotional
router.get('/', DevotionalController.devotional_get_one);

module.exports = router;