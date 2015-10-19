'use strict';

var mongoose = require('mongoose'),
    Feedback = mongoose.model('Feedback'),
    Moment = mongoose.model('Moment'),
    momentCtrl = require('./momentController');


exports.list = function (req, res) {

    Feedback.find({
        'moment': req.query['momentId']
    }).populate('states')
        .populate('alias', '_id name image')
        .exec(function (err, feedback) {
            res.status(200).send(feedback);
        });
};

exports.create = function (req, res) {
    var feedback = new Feedback(req.body);
    feedback.save(function (err) {
        if (err) {
            console.log(err);
            return res.status(400).send({
                message: ''
            });
        } else {
            momentCtrl.momentByID(req, res, function () {
                console.log('POST creating new feedback: ' + feedback);
                req.moment.feedback.push(feedback);
                req.moment.save(function (err) {
                    feedback
                        .populate('states')
                        .populate({
                            path: 'alias',
                            select: '_id name image'
                        }, function (err, feedback) {
                            res.status(200).send(feedback);
                        });
                });
            }, feedback.moment);
        }
    });
};

exports.update = function (req, res) {

};

exports.remove = function (req, res) {

};

exports.feedbackByID = function (req, res, next, id) {
    Feedback.findOne({
        _id: id
    }).exec(function (err, feedback) {
        if (err) return next(err);
        if (!feedback) return next(new Error('Failed to load empathy ' + id));
        req.feedback = feedback;
        next();
    });
};