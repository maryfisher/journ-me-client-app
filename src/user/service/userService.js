// @require user.user
(function(angular, undefined) {
    'use strict';

    var app = angular.module('jmUser');

    app.factory('jmUserService', function($http) {
        var DEFAULT_CONFIG = {
            timeout: 60000
        };

        var service = {
            getUser: function(userId) {
                return $http.get(
                    '/api/user/' + userId,
                    {},
                    DEFAULT_CONFIG
                ).then(
                    function() {

                    },
                    function() {

                    }
                );
            }
        };

        return service;
    });

} (window.angular));