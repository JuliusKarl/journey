const mongoose = require('mongoose');

const devotionalSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    text: { type: String, required: true },
    reference: { type: String, required: true },
    readingUrl: { type: String, required: true },
    date: {type: String, required: true },
    note: { type: String }});

module.exports = mongoose.model("Devotional", devotionalSchema);