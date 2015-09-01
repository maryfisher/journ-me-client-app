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
        JOURNEY_PATH_CREATE: journey + 'create/',
        JOURNEY_PATH_UPDATE: journey + 'update/',
        USER_PATH: user,
        AUTH_PATH: auth,
        LOGIN_PATH: auth + 'login/',
        LOGOUT_PATH: auth + 'logout/',
        REGISTER_PATH: auth + 'register/',
        HTTP_CONFIG: {
            timeout: 60000
        }
    });


} (window.angular));