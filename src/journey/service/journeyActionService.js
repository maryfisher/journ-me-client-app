// @require journey.journey
(function (angular, undefined) {
    'use strict';

    var app = angular.module('jmJourney');

    app.factory('jmJourneyActionService', function ($http) {

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
                    '/api/journey/' + journeyId + '/follow/' + aliasId, {});
            },
            unfollowJourney: function (journeyId, aliasId) {
                return $http.post(
                    //getPath(jmServerConst.UNFOLLOW_JOURNEY_PATH, aliasId, journeyId)
                    '/api/journey/' + journeyId + '/unfollow/' + aliasId, {});
            },
            linkJourney: function (linkedJourneyId, journeyId) {
                return $http.post(
                    //getPath(jmServerConst.UNFOLLOW_JOURNEY_PATH, aliasId, journeyId)
                    '/api/journey/' + journeyId + '/link/' + linkedJourneyId);
            }
        };
    });

}(window.angular));