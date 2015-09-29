'use strict';

module.exports = function (app) {

    var momentCtrl = require('../../controller/momentController');
    var empathyCtrl = require('../../controller/empathyController');

    var moment = '/api/moment/';
    var empathy = '/api/empathy/';
    app.route(moment + ':momentId/').get(momentCtrl.read);
    app.route(moment).post(momentCtrl.create);
    app.route(moment + ':momentId/').post(momentCtrl.update);
    app.param('momentId', momentCtrl.momentByID);

    app.route(empathy).get(empathyCtrl.list);
    app.route(empathy).post(empathyCtrl.create);
    app.route(empathy + ':empathyId/').post(empathyCtrl.update);
    app.param('empathyId', empathyCtrl.empathyByID);
}