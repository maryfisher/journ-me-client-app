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
    var aliasId = ':aliasId/';
    var moment = api + 'moment/';
    var momentId = moment + ':momentId/';

    common.constant('jmServerConst', {
        JOURNEY_PATH: journey,
        JOURNEY_ID_PATH: journeyId,
        MOMENT_PATH: moment,
        MOMENT_ID_PATH: momentId,
        FOLLOW_JOURNEY_PATH: journeyId + 'follow/' + aliasId,
        USER_PATH: user,
        ALIAS_PATH: alias,
        ALIAS_ID_PATH: alias + aliasId,
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