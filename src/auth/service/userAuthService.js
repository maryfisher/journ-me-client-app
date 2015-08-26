(function(angular, undefined) {
    'use strict';

    var app = angular.module('jmAuth');

    app.factory('jmUserAuthService', function($http, jmUserAuthVO) {
        var DEFAULT_CONFIG = {
            timeout: 60000
        };

        var service = {
            login: function(email, password) {
                return $http.post(
                    '/api/user/authentication/login',
                    {email: email, password: password},
                    DEFAULT_CONFIG
                ).then(
                    function(response) {
                        jmUserAuthVO.email = response.data.email;
                        jmUserAuthVO.id = response.data.userId;
                        jmUserAuthVO.role = response.data.role;
                        jmUserAuthVO.permissions = response.data.permissions;
                    },
                    function() {
                        jmUserAuthVO.email = '';
                    }
                );
            },
            register: function(email, password) {
                return $http.post(
                    '/api/user/authentication/register',
                    {email: email, password: password},
                    DEFAULT_CONFIG
                ).then(
                    function() {
                        jmUserAuthVO.email = email;

                    },
                    function() {
                        jmUserAuthVO.email = '';
                    }
                );
            },
            logout: function() {
                jmUserAuthVO.email = '';
            }
        };

        return service;
    });

} (window.angular));