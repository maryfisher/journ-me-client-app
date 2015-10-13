'use strict';

module.exports = function (app) {

    var momentCtrl = require('../../controller/momentController');
    var feedbackCtrl = require('../../controller/feedbackController');
    var blinkCtrl = require('../../controller/blinkController'),
        multiparty = require('connect-multiparty');

    var moment = '/api/moment/';
    var state = '/api/state/';
    var momentId = moment + ':momentId/';
    var feedback = '/api/feedback/';
    var blink = '/api/blink/';

    app.route(momentId).get(momentCtrl.read);
    app.route(moment).post(momentCtrl.create);
    app.route(momentId).post(momentCtrl.update);
    app.param('momentId', momentCtrl.momentByID);

    app.route(state).get(momentCtrl.listStates);

    app.route(feedback).get(feedbackCtrl.list);
    app.route(feedback).post(feedbackCtrl.create);
    app.route(feedback + ':feedbackId/').post(feedbackCtrl.update);
    app.param('feedbackId', feedbackCtrl.feedbackByID);

    app.route(blink).get(blinkCtrl.list);
    app.route(blink + ':blinkId/').get(blinkCtrl.read);
    app.route(blink).post(multiparty(), blinkCtrl.create);
    app.route(blink + ':blinkId/').post(multiparty(), blinkCtrl.update);
    app.param('blinkId', blinkCtrl.blinkByID);
}