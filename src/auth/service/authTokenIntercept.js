// @require auth.auth
(function(angular, undefined) {
    'use strict';

    var app = angular.module('jmAuth');

    app.factory('jmAuthTokenIntercept', function(jmUserAuthVO) {
        return {
            request: function(config) {
                if (jmUserAuthVO.isLoggedIn()) {
                    config.headers['x-jm-auth-token'] = jmUserAuthVO.authToken;
                }
                return config;
            }
        };
    });

} (window.angular));