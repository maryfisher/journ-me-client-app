'use strict';

var mongoose = require('mongoose'),
    Journey = mongoose.model('Journey'),
    aliasCtrl = require('./aliasController');

exports.read = function (req, res) {
    try {
        req.journey.id = req.journey._id;
        aliasCtrl.aliasByID(req, res, function () {
            req.journey.alias = req.alias;
            req.journey.populate('moments', function (err, journey) {
                if (err) {
                    return next(err);
                } else {
                    req.journey.populate('followers', function (err, journey) {
                        if (err) {
                            return next(err);
                        } else {
                            res.status(200).send(journey);
                        }
                    });
                }

            });
        }, req.journey.alias);

    } catch (e) {
        console.error(e);
        res.status(404).body('Not Found').end();
    }
};

exports.create = function (req, res) {
    var journey = new Journey(req.body);
    aliasCtrl.aliasByID(req, res, function () {
        journey.save(function (err) {
            if (err) {
                console.log(err);
                return res.status(400).send({
                    message: ''
                });
            } else {
                journey.id = journey._id;
                console.log('POST creating new journey: ' + journey);
                req.alias.journeys.push(journey);
                req.alias.save(function (err) {
                    res.status(200).send(journey);
                });
            }
        });
    }, req.body.aliasId);
};

exports.update = function (req, res) {
    console.log(req.body);
    Journey.findByIdAndUpdate(req.body.id, req.body, {
        new: true
    }, function (err, journey) {
        if (err) {
            console.log(err);
            return res.status(400).send({
                message: ''
            });
        } else {
            journey.id = journey._id;
            console.log('POST updating journey: ' + journey);
            res.status(200).send(journey);
        }
    });
};

exports.remove = function (req, res) {

};

exports.follow = function (req, res) {
    var journey = req.journey;
    journey.followers.push(req.alias._id);

    journey.save(function (err) {
        if (err) {
            console.log(err);
            return res.status(400).send({
                message: ''
            });
        } else {
            req.alias.followedJourneys.push(journey._id);
            req.alias.save(function (err) {
                res.status(200).send(journey);
            });
        }
    });
};

exports.unfollow = function (req, res) {
    var journey = req.journey;
    var alias = req.alias;
    journey.followers.splice(journey.followers.indexOf(alias._id), 1);

    journey.save(function (err) {
        if (err) {
            console.log(err);
            return res.status(400).send({
                message: ''
            });
        } else {
            alias.followedJourneys.splice(alias.followedJourneys.indexOf(journey._id, 1));
            alias.save(function (err) {
                res.status(200).send(journey);
            });
        }
    });
};

exports.journeyByID = function (req, res, next, id) {
    Journey.findOne({
        _id: id
    }).exec(function (err, journey) {
        if (err) return next(err);
        if (!journey) return next(new Error('Failed to load Journey ' + id));
        req.journey = journey;
        next();
    });
};