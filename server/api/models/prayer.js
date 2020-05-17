const mongoose = require('mongoose');

const prayerSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: { type: String, required: true },
    body: { type: Number, required: false },
    date: {type: Date, default: Date.now, required: true },
    dateAnswered: {type: Date, required: false }});

module.exports = mongoose.model("Prayer", prayerSchema);