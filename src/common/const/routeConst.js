// @require common.common
(function(angular, undefined) {
    'use strict';

    var auth = angular.module('jmCommon');

    auth.constant('jmRouteConst', {
        HOME: '/home',
        USER: '/user',
        BROWSE: '/browse',
        USER_PATH: this.USER + "/:id"
    });


} (window.angular));