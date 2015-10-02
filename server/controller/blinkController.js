'use strict';

var mongoose = require('mongoose'),
    Blink = mongoose.model('Blink'),
    Moment = mongoose.model('Moment'),
    momentCtrl = require('./momentController'),
    fs = require('fs');


exports.list = function (req, res) {
    if(!req.query['index']){
        Blink.find({
            'moment': req.query['moment']
        }, function (err, blinks) {
            res.status(200).send(blinks);
        });
    }else {
        Blink.findOne({
            moment: req.query['moment'],
            index: req.query['index']
        }, function (err, blink) {
            res.status(200).send(blink);
        });
    }
};

exports.read = function (req, res) {
    res.status(200).send(req.blink);
}

exports.create = function (req, res) {
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

        var blink = new Blink(JSON.parse(req.body.blink));
        momentCtrl.momentByID(req, res, function(err){
            var moment = req.moment;
            blink.index = moment.blinks.length - 1;
            blink.images = [];
            blink.images.push(base64Image);

            blink.save(function (err) {
                if (err) {
                    console.log(err);
                    return res.status(400).send({
                        message: ''
                    });
                } else {
                    moment.blinks.push(blink);
                    moment.save(function (err) {
                        res.status(200).send(blink);
                    });
                }
            });
        }, blink.moment);
    });
};

exports.update = function (req, res) {

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