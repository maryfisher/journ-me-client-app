// @require common.common
(function(angular, undefined) {
    'use strict';

    var app = angular.module('jmCommon');

    app.factory('jmRouteUtil', function(jmRouteConst, jmUserAuthVO) {
        return {
            routeConst: jmRouteConst,
            getUser: function () {
                return jmRouteConst.USER + '/' + jmUserAuthVO.id;
            }
        }
    });

} (window.angular));