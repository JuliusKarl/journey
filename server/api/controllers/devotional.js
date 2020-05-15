const Devotional = require("../models/devotional");
const fetch = require('node-fetch');

/** Get single daily devotional */
exports.devotional_get_one = (req, res, next) => {
    fetch('https://devotionalium.com/api/v2')
        .then(response => response.json())
        .then(response => res.status(200).json(response))
        .catch(err => {
            res.status(500).json({error: err})});}

