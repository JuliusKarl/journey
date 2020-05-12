const User = require("../models/user");
const bcrypt = require('bcrypt');
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');

// Get all users
exports.user_get_all = (req, res, next) => {
    console.log(req.userData);
    User
        .find()
        .exec()
        .then(result => {
            const response = {
                users: result.map(result => {
                    return {
                        _id: result.id,
                        name: result.name,
                        email: result.email,
                        password: result.password
                    }
                })
            }
            res.status(200).json(response)
        })
        .catch(err => {res.status(500).json({error: err})})
}

// Check email valid
exports.user_check_email = (req, res, next) => {
    console.log(req.body.email);
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length >= 1) {
                return res.status(409).json({
                    message: "Mail Exists",
                    status: true
                })
            }
            else {
                return res.status(200).json({
                    message: "Mail Available",
                    status: false
                })
            }
        })
}

// Signup one user
exports.user_post_one = (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length >= 1) {
                return res.status(409).json({
                    message: "Mail Exists"
                })
            }
            else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        // return res.status(500).json({error: err});
                        return res.redirect('http://18.233.138.219/login?success=false')
                    }
                    else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId,
                            name: req.body.name,
                            email: req.body.email,
                            password: hash
                        });
                        user
                            .save()
                            .then(result => {res.redirect('http://18.233.138.219/login?success=true')})
                            .catch(err => {res.status(500).json({error: err});
                        });
                    }
                });
            }
        })
}

// Login one user
exports.user_login = (req, res, next) => {
    User
        .find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length < 1) {
                console.log("1");
                // return res.status(401).json({
                //     message: "Auth Failed",
                //     status: false
                // })
                return res.redirect('http://18.233.138.219/login');
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: "Auth Failed",
                        status: false
                    })
                    // return res.redirect('http://18.233.138.219/login');
                }
                if (result) {
                    const token = jwt.sign({
                        email: user[0].email,
                        id: user[0]._id
                    }, process.env.JWT_KEY, {
                        expiresIn: "1h"
                    });
                    // res.status(401).json({
                    //     message: "Auth Failed",
                    //     status: true
                    // })
                    return res.redirect('http://18.233.138.219/');
                }
                else {
                    return res.redirect('http://18.233.138.219/login');
                }
            })
        })
        .catch(err => {
            // return res.status(401).json({
            //     message: "Auth Failed",
            //     status: false
            // })
            return res.redirect('http://18.233.138.219/login');
        })
}

// Find one user
exports.user_find_one = (req, res, next) => {
    User
        .findOne({email: req.userData['email']})
        .exec()
        .then(result => {
            const response = {
                _id: result.id,
                name: result.name,
                email: result.email
            }
            res.status(200).json(response)
        })
        .catch(err => {res.status(500).json({error: err})})
}

// Delete one user
exports.user_delete_one = (req, res, next) => {
    const id = req.params.userId;
    User
        .remove({_id: id})
        .exec()
        .then(result => {
            const response = {
                message: "User deleted."
            }
            res.status(200).json(response)
        })
        .catch(err => {console.log(err);res.status(500).json({error: err})})
}