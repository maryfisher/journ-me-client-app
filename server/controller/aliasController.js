'use strict';

var mongoose = require('mongoose'),
    Alias = mongoose.model('Alias');

exports.read = function (req, res) {
    try {
        req.alias.id = req.alias._id;
        req.alias.populate('journeys', function (err, alias) {
            if (err) {
                return next(err);
            }
            console.log('journeys: ' + alias.journeys);
            res.status(200).send(alias);
        });
    } catch (e) {
        console.error(e);
        res.status(404).body('Not Found').end();
    }
};

exports.create = function (req, res) {
    var alias = new Alias(req.body);
    alias.user = req.user;
    alias.save(function (err) {
        if (err) {
            console.log(err);
            return res.status(400).send({
                message: ''
            });
        } else {
            alias.id = alias._id;
            console.log('POST creating new alias: ' + alias);
            req.user.aliases.push(alias);
            req.user.save(function (err) {
                res.status(200).send(alias);
            });
        }
    });
};

exports.update = function (req, res) {

};

exports.remove = function (req, res) {

};

exports.aliasByID = function (req, res, next, id) {
    Alias.findOne({
        _id: id
    }).exec(function (err, alias) {
        if (err) return next(err);
        if (!alias) return next(new Error('Failed to load alias ' + id));
        req.alias = alias;
        next();
    });
};