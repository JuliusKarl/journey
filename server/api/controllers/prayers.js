const User = require("../models/prayer");
const bcrypt = require('bcrypt');
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');

/** Get all prayers */
exports.user_get_all = (req, res, next) => {
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
                        password: result.password}})}
            res.status(200).json(response)})
        .catch(err => {res.status(500).json({error: err})})}

/** Add new prayer */
exports.user_post_one = (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length >= 1) {
                return res.status(409).json({
                    message: "Mail Exists"})}
            else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(200).json({
                            message: "Auth Failed",
                            status: false})}
                    else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId,
                            name: req.body.name,
                            email: req.body.email,
                            password: hash});
                        user
                            .save()
                            .then(result => {
                                return res.status(200).json({
                                    message: "Auth Success",
                                    status: true})})
                            .catch(err => {
                                res.status(500).json({
                                    error: err});});}});}})}

/** Search for prayer / change from findOne to findLike? */
exports.user_find_one = (req, res, next) => {
    const decoded = jwt.verify(req.body.token, process.env.JWT_KEY);
    User
        .findOne({email: decoded["email"]})
        .exec()
        .then(result => {
            const response = {
                _id: result.id,
                name: result.name,
                email: result.email}
            res.status(200).json(response)})
        .catch(err => {res.status(500).json({error: err})})}

/** Delete one prayer */
exports.user_delete_one = (req, res, next) => {
    const id = req.params.userId;
    User
        .remove({_id: id})
        .exec()
        .then(result => {
            const response = {
                message: "User deleted."}
            res.status(200).json(response)})
        .catch(err => {console.log(err);res.status(500).json({error: err})})}