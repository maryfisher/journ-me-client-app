// @require journey.journey
(function (angular, undefined) {
    'use strict';

    var app = angular.module('jmJourney');

    app.factory('jmJourneyActionService', function ($http, jmServerConst, $q, jmAliasVO, jmJourneyVO) {

        /*var getPath = function (path, aliasId, journeyId) {
            return jmServerUtil.buildPath(path, {
                journeyId: journeyId,
                aliasId: aliasId
            })
        };*/

        var setResponse = function (response) {
            jmAliasVO.followedJourneys = response.data.alias.followedJourneys;
            jmJourneyVO.followers = response.data.journey.followers;
            return response;
        };

        return {
            followJourney: function (journeyId, aliasId) {
                return $http.post(
                        //getPath(jmServerConst.FOLLOW_JOURNEY_PATH, aliasId, journeyId)
                        '/api/journey/' + journeyId + '/follow/' + aliasId, {})
                    .then(
                        setResponse,
                        function (response) {
                            return $q.reject(response);
                        }
                    );
            },
            unfollowJourney: function (journeyId, aliasId) {
                return $http.post(
                        //getPath(jmServerConst.UNFOLLOW_JOURNEY_PATH, aliasId, journeyId)
                        '/api/journey/' + journeyId + '/unfollow/' + aliasId, {})
                    .then(
                        setResponse,
                        function (response) {
                            return $q.reject(response);
                        }
                    );
            }
        };
    });

}(window.angular));