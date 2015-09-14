// @require common.common
(function (angular, undefined) {
    'use strict';

    var common = angular.module('jmCommon');

    var api = '/api/';
    var user = api + 'user/';
    var auth = user + 'authentication/';
    var alias = api + 'alias/';
    var aliasId = ':aliasId/';
    var journey = api + 'journey/';
    var journeyId = ':journeyId/';
    var journeyPath = journey + journeyId;
    var moment = api + 'moment/';
    var momentId = ':momentId/';

    common.constant('jmServerConst', {
        JOURNEY_PATH: journey,
        JOURNEY_ID_PATH: journeyPath,
        FOLLOW_JOURNEY_PATH: journeyPath + 'follow/' + aliasId,

        MOMENT_PATH: moment,
        MOMENT_ID_PATH: moment + momentId,

        ALIAS_PATH: alias,
        ALIAS_ID_PATH: alias + aliasId,

        USER_PATH: user,
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