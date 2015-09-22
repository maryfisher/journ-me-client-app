'use strict';

var mongoose = require('mongoose'),
    Journey = mongoose.model('Journey'),
    aliasCtrl = require('./aliasController');

exports.read = function (req, res) {
    req.journey
        .populate('alias', '_id name')
        .populate('moments')
        .populate('followers', '_id name')
        .populate('linkedToJourneys', '_id alias name descript')
        .populate('joinRequests', '_id name')
        .populate('joinedAliases', '_id name')
        .populate({
                path: 'linkedFromJourneys',
                select: '_id alias name descript'
            },
            function (err, journey) {
                if (err) {
                    return next(err);
                } else {
                    res.status(200).send(journey);
                }
            });

};

exports.create = function (req, res) {
    var journey = new Journey(req.body);
    journey.alias = req.body.aliasId;
    journey.populate({
        path: 'alias',
        select: '_id'
    }, function () {
        journey.save(function (err) {
            if (err) {
                console.log(err);
                return res.status(400).send({
                    message: ''
                });
            } else {
                console.log('POST creating new journey: ' + journey);
                journey.alias.journeys.push(journey);
                journey.alias.save(function (err) {
                    res.status(200).send(journey);
                });
            }
        });
    });
};

exports.update = function (req, res) {
    console.log(req.body);
    Journey.findByIdAndUpdate(req.body._id, req.body, {
        new: true
    }, function (err, journey) {
        if (err) {
            console.log(err);
            return res.status(400).send({
                message: ''
            });
        } else {
            journey
                .populate('linkedToJourneys', '_id alias name descript')
                .populate('linkedFromJourneys', '_id alias name descript')
                .populate({
                    path: 'alias',
                    select: '_id'
                }, function (err, journey) {
                    if (err) {
                        return next(err);
                    } else {
                        console.log('POST updating journey: ' + journey);
                        res.status(200).send(journey);
                    }
                });
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
                res.status(200).send();
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
            var index = alias.followedJourneys.indexOf(journey._id);
            alias.followedJourneys.splice(index, 1);
            alias.save(function (err) {
                res.status(200).send();
            });
        }
    });
};

exports.requestJoin = function (req, res) {
    var journey = req.journey;
    journey.joinRequests.push(req.alias._id);

    journey.save(function (err) {
        if (err) {
            console.log(err);
            return res.status(400).send({
                message: ''
            });
        } else {
            res.status(200).send();
        }
    });
};

exports.leaveJourney = function (req, res) {
    var journey = req.journey;
    var alias = req.alias;
    journey.joinedAliases.splice(journey.joinedAliases.indexOf(alias._id), 1);

    journey.save(function (err) {
        if (err) {
            console.log(err);
            return res.status(400).send({
                message: ''
            });
        } else {
            var index = alias.joinedJourneys.indexOf(journey._id);
            alias.joinedJourneys.splice(index, 1);
            alias.save(function (err) {
                res.status(200).send();
            });
        }
    });
};

exports.acceptJoinRequest = function (req, res) {
    var journey = req.journey;
    journey.joinedAliases.push(req.alias._id);
    journey.joinRequests.splice(journey.joinRequests.indexOf(req.alias._id), 1);

    journey.save(function (err) {
        if (err) {
            console.log(err);
            return res.status(400).send({
                message: ''
            });
        } else {
            req.alias.joinedJourneys.push(journey._id);
            req.alias.save(function (err) {
                res.status(200).send();
            });
        }
    });
};

exports.link = function (req, res) {
    var journey = req.journey;
    var linkedJourney = req.linkedJourney;
    linkedJourney.linkedToJourneys.push(journey);

    linkedJourney.save(function (err) {
        if (err) {
            console.log(err);
            return res.status(400).send({
                message: ''
            });
        } else {
            //TODO notification
            journey.linkedFromJourneys.push(linkedJourney);
            journey.save(function (err) {
                if (err) {
                    console.log(err);
                    return res.status(400).send({
                        message: ''
                    });
                } else {
                    res.status(200).send();
                }
            })
        }
    });
};

exports.unlink = function (req, res) {
    var journey = req.journey;
    var linkedJourney = req.linkedJourney;
    linkedJourney.linkedToJourneys.splice(linkedJourney.linkedToJourneys.indexOf(journey), 1);

    linkedJourney.save(function (err) {
        if (err) {
            console.log(err);
            return res.status(400).send({
                message: ''
            });
        } else {
            //TODO notification
            journey.linkedFromJourneys.splice(journey.linkedFromJourneys.indexOf(linkedJourney), 1);
            journey.save(function (err) {
                if (err) {
                    console.log(err);
                    return res.status(400).send({
                        message: ''
                    });
                } else {
                    journey
                        .populate('linkedFromJourneys')
                        .populate('linkedToJourneys', function (err, journey) {
                            if (err) {
                                return next(err);
                            } else {
                                res.status(200).send(journey);
                            }
                        });
                }
            })
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

exports.linkedJourneyByID = function (req, res, next, id) {
    Journey.findOne({
        _id: id
    }).exec(function (err, journey) {
        if (err) return next(err);
        if (!journey) return next(new Error('Failed to load Journey ' + id));
        req.linkedJourney = journey;
        next();
    });
};