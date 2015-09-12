// @require common.common
(function (angular, undefined) {
    'use strict';

    var app = angular.module('jmCommon');

    app.factory('jmRouteUtil', function (jmRouteConst, $state) {
        var util = {
            routeConst: jmRouteConst,
            redirectTo: function (path, params) {
                $state.go(path, params);
            },
            redirectToJourney: function (params) {
                $state.go(jmRouteConst.JOURNEY_DETAIL, params);
            },
            reload: function () {
                $state.go($state.$current, null, {
                    reload: true
                });
            }
        };

        return util;
    });

}(window.angular));