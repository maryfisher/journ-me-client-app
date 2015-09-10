'use strict';

module.exports = function (app) {
    var aliasCtrl = require('../../controller/aliasController');

    var alias = '/api/alias/';
    app.route(alias + ':aliasId').get(aliasCtrl.read);
    app.param('aliasId', aliasCtrl.aliasByID);
}