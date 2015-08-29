// @require user.user
(function(angular, undefined) {
    'use strict';

    var app = angular.module('jmUser');

    app.factory('jmUserService', function($http, jmRouteUtil) {
        var DEFAULT_CONFIG = {
            timeout: 60000
        };

        return {
            getLoggedInUser: function () {
                return $http.get(
                    jmRouteUtil.getUserPath(),
                    DEFAULT_CONFIG
                ).then(
                    function () {

                    },
                    function () {
                        // don't forget to use $q.reject here!
                    }
                );
            },
            getOtherUser: function (userId) {
                return $http.get(
                    jmRouteUtil.getUserPath(userId),
                    DEFAULT_CONFIG
                ).then(
                    function () {

                    },
                    function () {
                        // don't forget to use $q.reject here!
                    }
                );
            }
        };
    });

} (window.angular));