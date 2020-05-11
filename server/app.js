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
const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
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
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/user', userRoutes);
app.use('/devotional', devotionalRoutes);

module.exports = app;


// EXTRA CODE BELOW!!!
//
//
// Allow CORS
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', '*');
//     if (req.method == 'OPTIONS') {
//         res.header('Access-Control-Allow-Methods', 'PUT, PATCH, POST, DELETE, GET');
//         return res.status(200).json({});
//     };
// });

// //  Invalid Endpoint
// app.use('/*', (req, res, next) => {
//     res.status(404).json({
//         error: "Page not Found by Julius"
//     });
// })
// Build Prod
// app.get('*', function (request, response){  
//     response.sendFile(path.resolve(__dirname, 'client/public', 'index.html')) 
// })