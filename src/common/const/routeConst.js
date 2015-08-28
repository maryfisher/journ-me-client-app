// @require common.common
(function(angular, undefined) {
    'use strict';

    var auth = angular.module('jmCommon');

    var home = '/home';

    auth.constant('jmRouteConst', {
        HOME: home,
        USER: '/user',
        BROWSE: '/browse',
        USER_PATH: home + '/:id'
    });


} (window.angular));