'use strict';

module.exports = function(app) {
	
    var momentCtrl = require('../../controller/momentController');
    
    var moment = '/api/journey/:journeyId/moment/';
    app.route(moment).post(momentCtrl.create);
    app.route(moment + ':momentId').post(momentCtrl.update);
    app.route(moment + ':momentId').get(momentCtrl.read);
    app.param('momentId', momentCtrl.momentByID);
}