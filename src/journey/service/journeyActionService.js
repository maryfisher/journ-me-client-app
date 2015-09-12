// @require journey.journey
(function (angular, undefined) {
    'use strict';

    var app = angular.module('jmJourney');

    app.factory('jmJourneyActionService', function ($http, jmServerConst, $q) {

        /*var getPath = function (path, aliasId, journeyId) {
            return jmServerUtil.buildPath(path, {
                journeyId: journeyId,
                aliasId: aliasId
            })
        };*/

        return {
            followJourney: function (journeyId, aliasId) {
                return $http.post(
                        //getPath(jmServerConst.FOLLOW_JOURNEY_PATH, aliasId, journeyId)
                        '/api/journey/' + journeyId + '/follow/' + aliasId, {})
                    .then(
                        function (data) {
                            return data;
                        },
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
                        function (data) {
                            return data;
                        },
                        function (response) {
                            return $q.reject(response);
                        }
                    );
            }
        };
    });

}(window.angular));