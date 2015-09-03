// @require common.common
(function(angular, undefined) {
    'use strict';

    var auth = angular.module('jmCommon');

    var userPath = '/user';
    var journeyPath = '/journey';

    auth.constant('jmRouteConst', {
        HOME_PATH: '/home',
        BROWSE_PATH: '/browse',
        JOURNEY_PATH: journeyPath,
        JOURNEY_DETAIL_PATH: journeyPath + '/:id',
        USER_PATH: userPath,
        DASHBOARD_PATH: userPath + '/dashboard',
        PROFILE_PATH:  userPath + '/profile'
    });


} (window.angular));