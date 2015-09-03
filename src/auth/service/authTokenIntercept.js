// @require auth.auth
(function(angular, undefined) {
    'use strict';

    var app = angular.module('jmAuth');

    app.factory('jmAuthTokenIntercept', function(jmUserAuthVO) {
        return {
            request: function(config) {
                if (jmUserAuthVO.isLoggedIn()) {
                    config.headers['x-jm-auth-token'] = jmUserAuthVO.role;
                }
                return config;
            }
        };
    });

    app.config(function ($httpProvider) {
        $httpProvider.interceptors.push('jmAuthTokenIntercept');
    });

} (window.angular));