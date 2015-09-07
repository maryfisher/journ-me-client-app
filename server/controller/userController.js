'use strict';

var	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Journey = mongoose.model('Journey'),
    fs = require('fs');

exports.login = function(user, req, res) {
    
    // Remove sensitive data before login
    user.password = undefined;
    //user.salt = undefined;
    
    fs.readFile('./test/server/pages/' + 2 + '.png', 'base64', function (error, data) {
        user.id = user._id;
        user.pic.data = data;
        user.pic.contentType = 'image/png';
        user.authToken = "2";
        if(error){
            console.log(error); 
        }
        res.status(200).set('Content-Type', 'text/json').send(user);
    });
}

exports.userByEmail = function(req, res, email, next) {
    User.findOne({
		email: email
	}).exec(function(err, user) {
        if (err) return next(err);
		if (!user) return next(new Error('Failed to load User ' + email));
        req.user = user;
		next();
	});
};

exports.userByID = function(req, res, next, id) {
    User.findOne({
		_id: id
	}).exec(function(err, user) {
        if (err) return next(err);
		if (!user) return next(new Error('Failed to load User ' + id));
		req.user = user;
		next();
	});
};

exports.register = function(req, res) {

	// Init Variables
	var user = new User(req.body);

	// Then save the user 
	user.save(function(err) {
		if (err) {
            console.log(err);
            /*err.err.indexOf('$email').should.not.equal(-1);
            err.err.indexOf('duplicate key error').should.not.equal(-1);*/
			return res.status(400).send({
				message: 'Duplicate Email'
			});
		} else {
            console.log('POST creating new user: ' + user);    
			exports.login(user, req, res);
		}
	});
};

exports.signin = function(req, res) {
    exports.userByEmail(req, res, req.body.email, function(err){
        if(err){
            
        }
		
        exports.login(req.user, req, res);
    });
};

exports.tokenlogin = function(req, res) {
    exports.userByEmail(req, res, "die_ulli@hotmail.com", function(err){
        if(err){
            
        }
		
        exports.login(req.user, req, res);
    });
};

exports.signout = function(req, res){
    try {
        res.status(200).set('Content-Type', 'text/json').send({

        });
    } catch (e) {
        console.error(e);
        //res.status(401).body('Unauthorized').end();
    }
};

exports.read = function(req, res) {
    try {
        req.user.password = undefined;
        req.user.populate('journeys', function(err, user) {
            if (err) { return next(err); }
            console.log('journeys: ' + user.journeys);
            res.status(200).send(user);
        });
    } catch (e) {
        console.error(e);
        res.status(404).body('Not Found').end();
    }
};