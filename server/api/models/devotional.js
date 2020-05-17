const mongoose = require('mongoose');

const devotionalSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    book: { type: String, required: true },
    bookNumber: { type: Number, required: true },
    chapter: { type: Number, required: true },
    verses: { type: Array, required: true },
    chapter: { type: String, required: true },
    reference: { type: String, required: true },
    readingUrl: { type: String, required: true },
    date: {type: Date, default: Date.now, required: true },
    note: { type: String, required: false }});

module.exports = mongoose.model("Devotional", devotionalSchema);