// @require user.user
(function (angular, undefined) {
    'use strict';

    var app = angular.module('jmUser');

    app.factory('jmAliasService', function ($http, $q, jmServerConst, jmAliasVO) {
        var DEFAULT_CONFIG = {
            timeout: 60000
        };

        return {
            getAlias: function (aliasId) {
                return $http.get(
                    jmServerConst.ALIAS_PATH + aliasId,
                    DEFAULT_CONFIG
                ).then(
                    function (response) {
                        jmAliasVO.setAlias(response.data);
                        return response;
                    },
                    function (response) {
                        return $q.reject(response);
                    }
                );
            }
        };
    });

}(window.angular));