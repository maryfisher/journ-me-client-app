// @require user.user
(function(angular, undefined) {
    'use strict';

    var app = angular.module('jmUser');

    app.factory('jmUserService', function($http, $q, jmServerConst, jmUserDashboardVO) {
        var DEFAULT_CONFIG = {
            timeout: 60000
        };

        return {
            getUser: function (userId) {
                return $http.get(
                    jmServerConst.USER_PATH + userId,
                    DEFAULT_CONFIG
                ).then(
                    function (response) {
                        jmUserDashboardVO.setUser(response.data);
                        return response;
                    },
                    function (response) {
                        return $q.reject(response);
                    }
                );
            }
        };
    });

} (window.angular));