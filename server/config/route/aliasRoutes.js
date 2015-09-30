'use strict';

module.exports = function (app) {
    var aliasCtrl = require('../../controller/aliasController'),
        multiparty = require('connect-multiparty');

    var alias = '/api/alias/',
        user = '/api/user/';
    app.route(alias + ':aliasId').get(aliasCtrl.read);
    app.route(user + 'profile/:aliasId').post(multiparty(), aliasCtrl.update);
    //app.route(user + 'profile/:aliasId').post(userCtrl.reqLogin, multiparty, aliasCtrl.update);
    app.param('aliasId', aliasCtrl.aliasByID);
}