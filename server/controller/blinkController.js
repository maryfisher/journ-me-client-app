'use strict';

var mongoose = require('mongoose'),
    Blink = mongoose.model('Blink'),
    Moment = mongoose.model('Moment'),
    momentCtrl = require('./momentController'),
    fs = require('fs');


exports.list = function (req, res) {
    if (!req.query['index']) {
        Blink.find({
            'moment': req.query['momentId']
        }, function (err, blinks) {
            if (err) {
                console.log(err);
                return res.status(400).send({
                    message: ''
                });
            }
            res.status(200).send(blinks);
        });
    } else {
        Blink.findOne({
            moment: req.query['momentId'],
            index: req.query['index']
        }, function (err, blink) {
            if (err) {
                console.log(err);
                return res.status(400).send({
                    message: ''
                });
            }
            blink.populate({
                path: 'states'
            }, function (err) {
                res.status(200).send(blink);
            });
        });
    }
};

exports.read = function (req, res) {
    res.status(200).send(req.blink);
}

var save = function (req, res, saveBlink) {
    var file = req.files.file;
    if (!file) {
        saveBlink();
        return;
    }
    //TODO
    //loop over several files?
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

        saveBlink(base64Image);
    });
}

exports.create = function (req, res) {
    save(req, res, function (base64Image) {
        var blink = new Blink(JSON.parse(req.body.blink));
        momentCtrl.momentByID(req, res, function (err) {
            var moment = req.moment;
            blink.index = moment.blinks.length;
            blink.images = [];
            if (base64Image) {
                blink.images.push(base64Image);
            }
            console.log(req.body.blink);
            for (var i = 0; i < req.body.blink.states.length; i++) {
                blink.states.push(req.body.blink.states[i]._id);
            }

            blink.save(function (err) {
                if (err) {
                    console.log(err);
                    return res.status(400).send({
                        message: ''
                    });
                } else {
                    moment.blinks.push(blink);
                    moment.save(function (err) {
                        blink.populate({
                            path: 'states'
                        }, function (err) {
                            res.status(200).send(blink);
                        });
                    });
                }
            });
        }, blink.moment);
    });
};

exports.update = function (req, res) {

    save(req, res, function (base64Image1, base64Image2) {
        var jsonBlink = JSON.parse(req.body.blink);
        req.blink.texts = jsonBlink.texts;
        req.blink.format = jsonBlink.format;
        req.blink.ratio = jsonBlink.ratio;
        if (base64Image1) {
            req.blink.images[0] = base64Image1;
        }
        if (base64Image2) {
            req.blink.images[1] = base64Image2;
        }

        req.blink.states.length = 0;
        for (var i = 0; i < jsonBlink.states.length; i++) {
            req.blink.states.push(jsonBlink.states[i]._id);
        }
        req.blink.save(function (err) {
            if (err) {
                console.log(err);
                return res.status(400).send({
                    message: ''
                });
            } else {
                req.blink.populate({
                    path: 'states'
                }, function (err) {
                    res.status(200).send(req.blink);
                });
            }
        });
    });
};

exports.remove = function (req, res) {

};

exports.blinkByID = function (req, res, next, id) {
    Blink.findOne({
        _id: id
    }).exec(function (err, blink) {
        if (err) return next(err);
        if (!blink) return next(new Error('Failed to load blink ' + id));
        req.blink = blink;
        next();
    });
};