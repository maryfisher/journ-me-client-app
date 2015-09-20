'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Journey = mongoose.model('Journey'),
    Alias = mongoose.model('Alias'),
    aliasCtrl = require('./aliasController'),
    fs = require('fs');

exports.login = function (user, req, res) {

    // Remove sensitive data before login
    user.password = undefined;
    //user.salt = undefined;

    user.authToken = "2";
    res.status(200).set('Content-Type', 'text/json').send(user);
}

exports.userByEmail = function (req, res, email, next) {
    User.findOne({
        email: email
    }).exec(function (err, user) {
        if (err) return next(err);
        if (!user) return next(new Error('Failed to load User ' + email));
        req.user = user;
        next();
    });
};

exports.userByID = function (req, res, next, id) {
    User.findOne({
        _id: id
    }).exec(function (err, user) {
        if (err) return next(err);
        if (!user) return next(new Error('Failed to load User ' + id));
        req.user = user;
        next();
    });
};

exports.register = function (req, res) {

    // Init Variables
    var user = new User(req.body);
    var alias = new Alias(req.body);
    user.aliases.push(alias);
    user.currentAlias = alias._id;

    // Then save the user 
    user.save(function (err) {
        if (err) {
            console.log(err);
            /*err.err.indexOf('$email').should.not.equal(-1);
            err.err.indexOf('duplicate key error').should.not.equal(-1);*/
            return res.status(400).send({
                message: 'Duplicate Email'
            });
        } else {
            console.log('POST creating new user: ' + user);
            alias.user = user._id;
            alias.save(function (err) {
                if (err) {
                    console.log(err);
                    return res.status(400).send({
                        message: ''
                    });
                } else {
                    exports.login(user, req, res);
                }
            });

        }
    });
};

exports.signin = function (req, res) {
    exports.userByEmail(req, res, req.body.email, function (err) {
        if (err) {

        } else {
            /*req.user.populate({
                path: 'currentAlias',
                select: '_id name'
            }, function () {*/
            exports.login(req.user, req, res);
            //});
        }
    });
};

exports.tokenlogin = function (req, res) {
    //exports.userByEmail(req, res, "eureka.mira@gmail.com", function (err) {
    //exports.userByEmail(req, res, "office@coronadogames.com", function (err) {
    exports.userByEmail(req, res, "die_ulli@hotmail.com", function (err) {
        if (err) {

        } else {
            /*req.user.populate({
                path: 'currentAlias',
                select: '_id name'
            }, function () {*/
            exports.login(req.user, req, res);
            //});
        }
    });
};

exports.signout = function (req, res) {
    try {
        res.status(200).set('Content-Type', 'text/json').send({

        });
    } catch (e) {
        console.error(e);
        res.status(401).body('Unauthorized').end();
    }
};

exports.read = function (req, res) {
    try {
        req.user.password = undefined;
        res.status(200).send(user);
    } catch (e) {
        console.error(e);
        res.status(404).body('Not Found').end();
    }
};