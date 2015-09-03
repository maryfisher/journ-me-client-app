// @require common.common
(function(angular, undefined) {
    'use strict';

    var common = angular.module('jmCommon');

    var api = '/api/';
    var user = api + 'user/';
    var auth = user + 'authentication/';

    common.constant('jmServerConst', {
        JOURNEY_PATH: api + 'journey',
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