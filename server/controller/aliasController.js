'use strict';

var mongoose = require('mongoose'),
    Alias = mongoose.model('Alias'),
    fs = require('fs');

exports.read = function (req, res) {
    try {
        req.alias
            .populate('journeys', '_id name descript alias linkedToJourneys linkedFromJourneys isPublic')
            .populate({
                path: 'followedJourneys',
                select: '_id alias descript name isPublic'
            }, function (err, alias) {
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
            console.log('POST creating new alias: ' + alias);
            req.user.aliases.push(alias);
            req.user.save(function (err) {
                res.status(200).send(alias);
            });
        }
    });
};

exports.update = function (req, res) {
    var alias = Alias.findOne({
        _id: req.alias._id
    }, function (err, alias) {
        var file = req.files.file;

        fs.readFile(file.path, function (err, original_data) {
            if (err) {
                return res.status(400).send({
                    message: ''
                });
            }
            // save image in db as base64 encoded - this limits the image size
            // to there should be size checks here and in client
            var base64Image = original_data.toString('base64');
            fs.unlink(file.path, function (err) {
                if (err) {
                    console.log('failed to delete ' + file.path);
                } else {
                    console.log('successfully deleted ' + file.path);
                }
            });

            alias.name = req.alias.name;
            alias.image = base64Image;

            alias.save(function (err) {
                if (err) {
                    console.log(err);
                    return res.status(400).send({
                        message: ''
                    });
                } else {
                    res.status(200).send(alias);
                }
            });
        });
    });
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