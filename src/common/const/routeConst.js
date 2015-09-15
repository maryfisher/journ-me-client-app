// @require common.common
(function (angular, undefined) {
    'use strict';

    var auth = angular.module('jmCommon');

    var userPath = '/user';
    var journeyPath = '/journey';
    var journeyId = journeyPath + '/:journeyId';
    var momentPath = '/moment';
    var momentId = momentPath + '/:momentId';

    auth.constant('jmRouteConst', {
        AUTH: 'AUTH',
        HOME: 'HOME',
        HOME_PATH: '/home',
        BROWSE: 'BROWSE',
        BROWSE_PATH: '/browse',
        JOURNEY_PATH: journeyPath,
        JOURNEY_DETAIL: 'JOURNEY_DETAIL',
        JOURNEY_DETAIL_PATH: journeyId,
        MOMENT_DETAIL: 'MOMENT_DETAIL',
        MOMENT_DETAIL_PATH: momentId,
        MOMENT_UPDATE: 'MOMENT_UPDATE',
        MOMENT_UPDATE_PATH: momentId + '/update' + journeyId, //this is the wrong way round to match MOMENT_CREATE
        MOMENT_CREATE: 'MOMENT_CREATE',
        MOMENT_CREATE_PATH: momentPath + '/create' + journeyId, //this is the wrong way round for now so ui.router does not get confused (bug??)
        USER_PATH: userPath,
        DASHBOARD: 'DASHBOARD',
        DASHBOARD_PATH: userPath + '/dashboard',
        PROFILE: 'PROFILE',
        PROFILE_PATH: userPath + '/profile',
        ALIAS_UPDATE: 'ALIAS_UPDATE',
        ALIAS_UPDATE_PATH: '/alias',
        SETTINGS: 'SETTINGS',
        SETTINGS_PATH: '/settings'
    });


}(window.angular));