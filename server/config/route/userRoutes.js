'use strict';

module.exports = function(app) {
	// User Routes
    var userCtrl = require('../../controller/userController');
    
    var user = '/api/user/';
    var auth = user + 'authentication/';
	app.route(auth + 'register').post(userCtrl.register);
	app.route(auth + 'login').post(userCtrl.signin);
	app.route(auth + 'tokenlogin').post(userCtrl.tokenlogin);
	app.route(auth + 'logout').post(userCtrl.signout);
    app.route(user + ':userId').get(userCtrl.read);
    app.param('userId', userCtrl.userByID);
}