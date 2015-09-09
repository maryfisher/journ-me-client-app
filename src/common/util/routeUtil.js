// @require common.common
(function (angular, undefined) {
    'use strict';

    var app = angular.module('jmCommon');

    app.factory('jmRouteUtil', function (jmRouteConst, jmUserAuthVO, $state) {
        var util = {
            routeConst: jmRouteConst,
            getHrefPath: function (pathConstName) {
                return util.addHashbang(pathConstName ? jmRouteConst[pathConstName] : '');
            },
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
            },
            addHashbang: function (path) {
                return path ? '#' + path : '#';
            }
        };

        return util;
    });

}(window.angular));