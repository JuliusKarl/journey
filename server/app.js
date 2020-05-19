const express = require('express');
const cors = require('cors');
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");

// Middleware setup
app.use(morgan("dev"));
app.use(express.static('uploads'))
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "client/build")));

// Route Paths
const userRoutes = require('./api/routes/user');
const devotionalRoutes = require('./api/routes/devotional');

// MongoDB connection
require('dotenv').config();
const uri = `mongodb+srv://${process.env.DBUSER}:${process.env.DBPASS}@cluster0-fzkp0.mongodb.net/test?retryWrites=true&w=majority`;
mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true}, function(err) {
    if (err) {console.log(err)}
    else {console.log("Connected to MongoDB... ")}
});

// Routes which should handle requests.
app.use('/user', userRoutes);
app.use('/devotional', devotionalRoutes);

module.exports = app;