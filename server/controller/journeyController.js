'use strict';

var mongoose = require('mongoose'),
    Journey = mongoose.model('Journey'),
    aliasCtrl = require('./aliasController');

exports.read = function (req, res) {
    try {
        req.journey.id = req.journey._id;
        req.journey.populate('moments', function (err, journey) {
            if (err) {
                return next(err);
            }
            res.status(200).send(journey);
        });
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