'use strict';

module.exports = function (app) {

    var journeyCtrl = require('../../controller/journeyController');

    var journey = '/api/journey/';
    app.route(journey).post(journeyCtrl.create);
    app.route(journey + ':journeyId').post(journeyCtrl.update);
    app.route(journey + ':journeyId/follow/:aliasId').post(journeyCtrl.follow);
    app.route(journey + ':journeyId/unfollow/:aliasId').post(journeyCtrl.unfollow);
    app.route(journey + ':journeyId/link/:linkedJourneyId').post(journeyCtrl.link);
    app.route(journey + ':journeyId/unlink/:linkedJourneyId').post(journeyCtrl.unlink);
    app.route(journey + ':journeyId').get(journeyCtrl.read);
    app.param('journeyId', journeyCtrl.journeyByID);
    app.param('linkedJourneyId', journeyCtrl.linkedJourneyByID);
}