// @require common.common
(function (angular, undefined) {
    'use strict';

    var common = angular.module('jmCommon');

    var api = '/api/';
    var user = api + 'user/';
    var alias = api + 'alias/';
    var auth = user + 'authentication/';
    var journey = api + 'journey/';
    var journeyId = journey + ':journeyId/';
    var moment = 'moment/';
    var momentId = moment + ':momentId';

    common.constant('jmServerConst', {
        JOURNEY_PATH: journey,
        JOURNEY_ID_PATH: journeyId,
        MOMENT_PATH: journeyId + moment,
        MOMENT_ID_PATH: journeyId + momentId,
        USER_PATH: user,
        ALIAS_PATH: alias,
        AUTH_PATH: auth,
        LOGIN_PATH: auth + 'login/',
        LOGIN_TOKEN_PATH: auth + 'tokenlogin/',
        LOGOUT_PATH: auth + 'logout/',
        REGISTER_PATH: auth + 'register/',
        HTTP_CONFIG: {
            timeout: 60000
        },
        COOKIE_TOKEN_KEY: 'jmAuthToken'
    });


}(window.angular));