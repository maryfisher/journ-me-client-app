'use strict';

module.exports = function(app) {
	// User Routes
    var journeyCtrl = require('../../controller/journeyController');
    
    var journey = '/api/journey/';
    app.route(journey).post(journeyCtrl.create);
    app.route(journey + ':journeyId').post(journeyCtrl.update);
    app.route(journey + ':journeyId').get(journeyCtrl.read);
    app.param('journeyId', journeyCtrl.journeyByID);
}