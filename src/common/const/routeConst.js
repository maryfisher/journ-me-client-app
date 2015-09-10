// @require common.common
(function (angular, undefined) {
    'use strict';

    var auth = angular.module('jmCommon');

    var userPath = '/user';
    var journeyPath = '/journey';
    var journey = journeyPath + '/:journeyId';

    auth.constant('jmRouteConst', {
        HOME: 'HOME',
        HOME_PATH: '/home',
        BROWSE: 'BROWSE',
        BROWSE_PATH: '/browse',
        JOURNEY_PATH: journeyPath,
        JOURNEY_DETAIL: 'JOURNEY_DETAIL',
        JOURNEY_DETAIL_PATH: journey,
        MOMENT_DETAIL: 'MOMENT_DETAIL',
        MOMENT_DETAIL_PATH: '/moment/:momentId',
        MOMENT_UPDATE: 'MOMENT_UPDATE',
        MOMENT_UPDATE_PATH: '/moment/:momentId/update' + journey, //this is the wrong way round to match MOMENT_CREATE
        MOMENT_CREATE: 'MOMENT_CREATE',
        MOMENT_CREATE_PATH: '/moment/create' + journey, //this is the wrong way round for now so ui.router does not get confused (bug??)
        USER_PATH: userPath,
        DASHBOARD: 'DASHBOARD',
        DASHBOARD_PATH: userPath + '/dashboard',
        PROFILE_PATH: userPath + '/profile'
    });


}(window.angular));