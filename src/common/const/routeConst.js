// @require common.common
(function(angular, undefined) {
    'use strict';

    var auth = angular.module('jmCommon');

    var userPath = '/user';

    auth.constant('jmRouteConst', {
        HOME_PATH: '/home',
        BROWSER_PATH: '/browse',
        USER_PATH: userPath,
        DASHBOARD_PATH: userPath + '/dashboard'
    });


} (window.angular));