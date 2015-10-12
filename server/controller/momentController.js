'use strict';

var mongoose = require('mongoose'),
    Moment = mongoose.model('Moment'),
    journeyCtrl = require('./journeyController'),
    State = mongoose.model('State');

exports.listStates = function (req, res) {
    State.find({}, function (err, states) {
        res.status(200).json(states);
    });
};

exports.read = function (req, res) {
    req.moment
        .populate({
            path: 'journey',
            select: 'id'
        }, function (err) {
            res.status(200).send(req.moment);
        });
};

exports.create = function (req, res) {
    var moment = new Moment(req.body);

    moment.save(function (err) {
        if (err) {
            console.log(err);
            return res.status(400).send({
                message: ''
            });
        } else {
            journeyCtrl.journeyByID(req, res, function () {
                console.log('POST creating new moment: ' + moment);
                req.journey.moments.push(moment);
                req.journey.save(function (err) {
                    res.status(200).send(moment);
                });
            }, moment.journey);
        }
    });
};

exports.update = function (req, res) {
    Moment.findByIdAndUpdate(req.body._id, req.body, {
        new: true
    }, function (err, moment) {
        if (err) {
            console.log(err);
            return res.status(400).send({
                message: ''
            });
        } else {
            console.log('POST updating moment: ' + moment);
            res.status(200).send(moment);
        }
    });
};

exports.remove = function (req, res) {

};

exports.momentByID = function (req, res, next, id) {
    Moment.findOne({
        _id: id
    }).exec(function (err, moment) {
        if (err) return next(err);
        if (!moment) return next(new Error('Failed to load Moment ' + id));
        req.moment = moment;
        next();
    });
};