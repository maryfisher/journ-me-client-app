// @require common.common
(function(angular, undefined) {
    'use strict';

    var common = angular.module('jmCommon');

    var api = '/api/';
    var user = api + 'user/';
    var auth = user + 'authentication/';
    var journey = api + 'journey/';

    common.constant('jmServerConst', {
        JOURNEY_PATH: journey,
        USER_PATH: user,
        AUTH_PATH: auth,
        LOGIN_PATH: auth + 'login/',
        LOGOUT_PATH: auth + 'logout/',
        REGISTER_PATH: auth + 'register/'
    });


} (window.angular));