'use strict';

var mongoose = require('mongoose'),
    Moment = mongoose.model('Moment'),
    journeyCtrl = require('./journeyController'),
    aliasCtrl = require('./aliasController');


exports.read = function (req, res) {
    req.moment.populate({
        path: 'journey',
        select: 'id'
    }, function (err) {
        res.status(200).send(req.moment);
    });
};

exports.create = function (req, res) {
    var moment = new Moment(req.body.moment);

    //aliasCtrl.aliasByID(req, res, function () {
    //moment.alias = req.alias._id;
    //moment.alias = req.body.aliasId;
    //journeyCtrl.journeyByID(req, res, function () {
    //moment.journey = req.journey;
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
    //}, req.body.journeyId);

    //}, req.body.aliasId);

};

exports.update = function (req, res) {
    console.log(req.body);
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