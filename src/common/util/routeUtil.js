// @require common.common
(function(angular, undefined) {
    'use strict';

    var app = angular.module('jmCommon');

    app.factory('jmRouteUtil', function(jmRouteConst, jmUserAuthVO, $location) {
        return {
            routeConst: jmRouteConst,
            getUserPath: function (userId) {
                userId = userId || jmUserAuthVO.id;
                return jmRouteConst.USER_PATH + '/' + userId;
            },
            redirectTo: function(path) {
                $location.path(path);
            }
        };
    });

} (window.angular));