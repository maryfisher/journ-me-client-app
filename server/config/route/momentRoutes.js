'use strict';

module.exports = function (app) {

    var momentCtrl = require('../../controller/momentController');

    var moment = '/api/moment/';
    app.route(moment + ':momentId/').get(momentCtrl.read);
    app.route(moment).post(momentCtrl.create);
    app.route(moment + ':momentId/').post(momentCtrl.update);
    app.param('momentId', momentCtrl.momentByID);
}