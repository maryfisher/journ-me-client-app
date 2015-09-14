// @require user.user
(function (angular, undefined) {
    'use strict';

    var app = angular.module('jmUser');

    app.factory('jmAliasService', function ($resource, $q, jmServerConst) {
        var aliasDAO = $resource(
            jmServerConst.ALIAS_ID_PATH
        );

        return {
            getAlias: function (aliasId) {
                return aliasDAO.get({
                    aliasId: aliasId
                }).$promise;
            }
        };
    });

}(window.angular));