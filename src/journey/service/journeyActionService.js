// @require journey.journey
(function (angular, undefined) {
    'use strict';

    var app = angular.module('jmJourney');

    app.factory('jmJourneyActionService', function ($http, jmServerConst, $q, jmAliasVO) {

        /*var getConfig = function (journeyId, aliasId) {
            return {
                timeout: 60000,
                params: {
                    journeyId: journeyId,
                    aliasId: aliasId
                }
            };
        };*/

        return {
            followJourney: function (journeyId, aliasId) {
                return $http.post(
                        //jmServerConst.FOLLOW_JOURNEY_PATH, {},
                        '/api/journey/' + journeyId + '/follow/' + aliasId, {})
                    .then(
                        function (response) {
                            jmAliasVO.setAlias(response.data);
                            return response;
                        },
                        function (response) {
                            return $q.reject(response);
                        }
                    );
            }
        };
    });

}(window.angular));