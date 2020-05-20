const User = require("../models/user");
const Prayer = require("../models/prayer")
const bcrypt = require('bcrypt');
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');

/** Get all users */
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
                        password: result.password,
                        dateCreated: result.dateCreated,
                        savedDevotionals: result.savedDevotionals,
                        savedPrayers: result.savedPrayers}})}
            res.status(200).json(response)})
        .catch(err => {res.status(500).json({error: err})})}

/** Check email exists */
exports.user_check_email = (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length >= 1) {
                return res.status(409).json({
                    message: "Mail Exists",
                    status: true})}
            else {
                return res.status(200).json({
                    message: "Mail Available",
                    status: false})}})}

/** Log in one user */
exports.user_login = (req, res, next) => {
    User
        .find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    message: "Auth Failed",
                    status: false});}
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: "Auth Failed",
                        status: false})}
                if (result) {
                    const token = jwt.sign({
                        email: user[0].email,
                        id: user[0]._id
                    }, process.env.JWT_KEY);
                    return res.status(200).json({
                        message: "Auth Success",
                        token: token,
                        status: true})}
                else {
                    return res.status(401).json({
                        message: "Auth Failed",
                        status: false})}})})
        .catch(err => {
            res.status(401).json({
                message: "Auth Failed",
                status: false})})}

/** Sign up one user */
exports.user_post_one = (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length >= 1) {
                console.log('0')
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
                            .then(() => {
                                console.log('4')
                                return res.status(200).json({
                                    message: "Auth Success",
                                    status: true})})
                            .catch(err => {
                                console.log('5')
                                res.status(500).json({
                                    error: err});});}});}})}

/** Find one user */
exports.user_find_one = (req, res, next) => {
    const decoded = jwt.verify(req.body.token, process.env.JWT_KEY);
    User
        .findOne({email: decoded["email"]})
        .exec()
        .then(result => {
            const response = {
                _id: result.id,
                name: result.name,
                email: result.email,
                savedDevotionals: result.savedDevotionals,
                savedPrayers: result.savedPrayers,
                answeredPrayers: result.answeredPrayers}
            res.status(200).json(response)})
        .catch(err => {res.status(500).json({error: err})})}

/** Find one prayer */
exports.prayer_find_one = (req, res, next) => {
    const decoded = jwt.verify(req.body.token, process.env.JWT_KEY);
    console.log(req.params.prayerId);
    
    User
        .findOne({email: decoded["email"]}, { savedPrayers: { $elemMatch : { _id : req.params.prayerId }}})
        .exec()
        .then(result => {
            const response = {
                prayer: result.savedPrayers[0]}
            res.status(200).json(response)})
        .catch(err => {res.status(500).json({error: err})})}

/** Add new prayer */
exports.user_patch_one = (req, res, next) => {
    const id = req.params.userId;
    const prayer = new Prayer({
        _id: new mongoose.Types.ObjectId,
        title: req.body.title,
        body: req.body.body});

    User
        .updateOne({ _id: id }, { $push : { savedPrayers : { $each : [ prayer ], $position: 0 } }})
        .exec()
        .then(result => {
            res.status(200).json({result:result});})
        .catch(err => {
            console.log(err);res.status(500).json({error: err})})}

/** Remove one prayer */
exports.user_patch_one_remove = (req, res, next) => {
    const id = req.params.userId;
    User
        .updateOne({ _id: id }, { $pull : { savedPrayers : { _id : req.body.id } }})
        .exec()
        .then(result => {
            return res.status(200).json({ result: result});})
        .catch(err => {
            console.log(err);res.status(500).json({error: err})})}


/** Delete one user */
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