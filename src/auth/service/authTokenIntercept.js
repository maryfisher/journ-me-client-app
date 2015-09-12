// @require auth.auth
(function (angular, undefined) {
    'use strict';

    var app = angular.module('jmAuth');

    app.factory('jmAuthTokenIntercept', function (jmAuthVO) {
        return {
            request: function (config) {
                if (jmAuthVO.isLoggedIn) {
                    config.headers['x-jm-auth-token'] = jmAuthVO.authToken;
                }
                return config;
            }
        };
    });

}(window.angular));