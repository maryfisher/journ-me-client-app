// @require common.common
(function (angular, undefined) {
    'use strict';

    var app = angular.module('jmCommon');

    app.factory('jmRouteUtil', function (jmRouteConst, $state) {
        var util = {
            routeConst: jmRouteConst,
            redirectTo: function (state, params) {
                $state.go(state, params);
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