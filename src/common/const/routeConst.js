// @require common.common
(function(angular, undefined) {
    'use strict';

    var auth = angular.module('jmCommon');

    var userPath = '/user';

    auth.constant('jmRouteConst', {
        HOME_PATH: '/home',
        BROWSE_PATH: '/browse',
        USER_PATH: userPath,
        DASHBOARD_PATH: userPath + '/dashboard',
        PROFILE_PATH:  userPath + '/profile'
    });


} (window.angular));