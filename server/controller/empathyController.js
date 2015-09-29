'use strict';

var mongoose = require('mongoose'),
    Empathy = mongoose.model('Empathy'),
    Moment = mongoose.model('Moment'),
    momentCtrl = require('./momentController');


exports.list = function (req, res) {

    Empathy.find({
        'moment': req.query['momentId']
    }, function (err, empathies) {
        Empathy.populate(empathies, {
            path: 'alias',
            select: '_id name image'
        }, function (err, empathies) {
            res.status(200).send({
                empathies: empathies
            });
        });
    });
};

exports.create = function (req, res) {
    console.log(req.body.empathy);
    var empathy = new Empathy(req.body.empathy);
    empathy.save(function (err) {
        if (err) {
            console.log(err);
            return res.status(400).send({
                message: ''
            });
        } else {
            momentCtrl.momentByID(req, res, function () {
                console.log('POST creating new empathy: ' + empathy);
                req.moment.empathies.push(empathy);
                req.moment.save(function (err) {
                    res.status(200).send(empathy);
                });
            }, empathy.moment);
        }
    });
};

exports.update = function (req, res) {

};

exports.remove = function (req, res) {

};

exports.empathyByID = function (req, res, next, id) {
    Empathy.findOne({
        _id: id
    }).exec(function (err, empathy) {
        if (err) return next(err);
        if (!empathy) return next(new Error('Failed to load empathy ' + id));
        req.empathy = empathy;
        next();
    });
};