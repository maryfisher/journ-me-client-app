'use strict';

module.exports = function (app) {

    var momentCtrl = require('../../controller/momentController');
    var empathyCtrl = require('../../controller/empathyController');
    var blinkCtrl = require('../../controller/blinkController'),
        multiparty = require('connect-multiparty');

    var moment = '/api/moment/';
    var momentId = moment + ':momentId/';
    var empathy = '/api/empathy/';
    var blink = '/api/blink/';

    app.route(momentId).get(momentCtrl.read);
    app.route(moment).post(momentCtrl.create);
    app.route(momentId).post(momentCtrl.update);
    app.param('momentId', momentCtrl.momentByID);

    app.route(empathy).get(empathyCtrl.list);
    app.route(empathy).post(empathyCtrl.create);
    app.route(empathy + ':empathyId/').post(empathyCtrl.update);
    app.param('empathyId', empathyCtrl.empathyByID);

    app.route(blink).get(blinkCtrl.list);
    app.route(blink + ':blinkId/').get(blinkCtrl.read);
    app.route(blink).post(multiparty(), blinkCtrl.create);
    app.route(blink + ':blinkId/').post(multiparty(), blinkCtrl.update);
    app.param('blinkId', blinkCtrl.blinkByID);
}