// @require common.common
(function(angular, undefined) {
    'use strict';

    var auth = angular.module('jmCommon');

    var userPath = '/user';
    var journeyPath = '/journey';
    var journey = journeyPath + '/:journeyId';

    auth.constant('jmRouteConst', {
        HOME: 'home',
        HOME_PATH: '/home',
        BROWSE: 'browse',
        BROWSE_PATH: '/browse',
        JOURNEY_PATH: journeyPath,
        JOURNEY_DETAIL: 'journeyDetail',
        JOURNEY_DETAIL_PATH: journey,
        JOURNEY_DETAIL_MOMENT: 'journeyDetail.moment',
        JOURNEY_DETAIL_MOMENT_PATH: '/moment/:momentId',
        MOMENT_UPDATE: 'momentUpdate',
        MOMENT_UPDATE_PATH: '/moment/:momentId/update' + journey, //this is the wrong way round to match MOMENT_CREATE
        MOMENT_CREATE: 'momentCreate',
        MOMENT_CREATE_PATH: '/moment/create' + journey, //this is the wrong way round for now so ui.router does not get confused (bug??)
        USER_PATH: userPath,
        DASHBOARD: 'dashboard',
        DASHBOARD_PATH: userPath + '/dashboard',
        PROFILE_PATH:  userPath + '/profile'
    });


} (window.angular));