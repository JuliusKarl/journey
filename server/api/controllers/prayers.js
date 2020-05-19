const User = require("../models/prayer");
const Prayer = require('../models/prayer');
const mongoose = require("mongoose");
const ObjectId = require('mongodb').ObjectID;

/** Get all prayers */
exports.prayers_get_all = (req, res, next) => {
    Prayer
        .find()
        .exec()
        .then(result => {
            const response = {
                prayers: result.map(result => {
                    return {
                        _id: result.id,
                        title: result.title,
                        body: result.body,
                        date: result.date}})}
            res.status(200).json(response)})
        .catch(err => {res.status(500).json({error: err})})}

// /** Add new prayer */
// exports.prayer_post_one = (req, res, next) => {
//     const prayer = new Prayer({
//         _id: new mongoose.Types.ObjectId,
//         title: req.body.title,
//         body: req.body.body})
//     prayer
//         .save()
//         .then(result => {
//             return res.status(200).json({
//                 message: "Auth Success",
//                 status: true})})
//         .catch(err => {
//             return res.status(500).json({
//                 error: err});});}

/** Add new prayer */
exports.prayer_post_one = (req, res, next) => {
    const id = req.params.userId;
    const prayer = new Prayer({
        title: req.body.title,
        body: req.body.body});

    User
        .update({ _id: id }, { $set: { name : "Jul" }})
        .exec()
        .then(result => {
            console.log(prayer);
            res.status(200).json({result:result});})
        .catch(err => {
            console.log(err);res.status(500).json({error: err})})}


/** Delete one prayer */
exports.prayer_delete_one = (req, res, next) => {
    const id = req.params.prayerId;
    Prayer
        .remove({_id: id})
        .exec()
        .then(result => {
            const response = {
                message: "Prayer deleted."}
            res.status(200).json(response)})
        .catch(err => {console.log(err);res.status(500).json({error: err})})}