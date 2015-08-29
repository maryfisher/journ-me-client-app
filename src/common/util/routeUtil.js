// @require common.common
(function(angular, undefined) {
    'use strict';

    var app = angular.module('jmCommon');

    app.factory('jmRouteUtil', function(jmRouteConst, jmUserAuthVO) {
        return {
            routeConst: jmRouteConst,
            getUserPath: function (userId) {
                userId = userId || jmUserAuthVO.id;
                return jmRouteConst.USER_PATH + '/' + userId;
            }
        };
    });

} (window.angular));