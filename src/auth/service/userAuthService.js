(function(angular, undefined) {
    'use strict';

    var app = angular.module('jmAuth');

    app.factory('jmUserAuthService', function($http) {
        var DEFAULT_CONFIG = {
            timeout: 60000
        };

        var loggedInUserEmail = '';

        return {
            login: function(email, password) {
                return $http.post(
                    '/api/user/authentication/login',
                    {email: email, password: password},
                    DEFAULT_CONFIG
                ).then(
                    function() {
                        loggedInUserEmail = email;
                    },
                    function() {
                        loggedInUserEmail = '';
                    }
                );
            },
            logout: function() {
                loggedInUserEmail = '';
            },
            isLoggedIn: function() {
                return loggedInUserEmail !== '';
            },
            getLoggedInUserEmail: function() {
                return loggedInUserEmail;
            }
        };
    });

} (window.angular));