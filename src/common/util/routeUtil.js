// @require common.common
(function(angular, undefined) {
    'use strict';

    var app = angular.module('jmCommon');

    app.factory('jmRouteUtil', function(jmRouteConst, jmUserAuthVO, $state) {
        var util = {
            routeConst: jmRouteConst,
            getUserPath: function (userId) {
                userId = userId || jmUserAuthVO.id;
                return util.addHashbang(jmRouteConst.USER_PATH + '/' + userId);
            },
            getJourneyPath: function (journeyId, useHashbang) {
                useHashbang = (typeof useHashbang === 'undefined') ? true : useHashbang;
                var path = jmRouteConst.JOURNEY_PATH + '/' + journeyId;
                if(useHashbang){
                    return util.addHashbang(path);
                }
                return path;
            },
            getHrefPath: function (pathConstName) {
                return util.addHashbang(pathConstName ? jmRouteConst[pathConstName] : '');
            },
            redirectTo: function(path) {
                $state.go(path);
            },
            reload: function(){
                $state.go($state.$current, null, { reload: true });
            },
            addHashbang: function (path) {
                return path ? '#' + path : '#';
            }
        };

        return util;
    });

} (window.angular));