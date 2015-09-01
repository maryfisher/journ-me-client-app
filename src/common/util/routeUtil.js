// @require common.common
(function(angular, undefined) {
    'use strict';

    var app = angular.module('jmCommon');

    app.factory('jmRouteUtil', function(jmRouteConst, jmUserAuthVO, $location) {
        var util = {
            routeConst: jmRouteConst,
            getUserPath: function (userId) {
                userId = userId || jmUserAuthVO.id;
                return util.addHash(jmRouteConst.USER_PATH + '/' + userId);
            },
            getJourneyPath: function (journeyId) {
                return util.addHash(jmRouteConst.JOURNEY_PATH + '/' + journeyId);
            },
            getHrefPath: function (pathConstName) {
                return util.addHash(pathConstName ? jmRouteConst[pathConstName] : '');
            },
            redirectTo: function(path) {
                $location.path(path);
            },
            addHash: function (path) {
                return path ? '#' + path : '#';
            }
        };

        return util;
    });

} (window.angular));