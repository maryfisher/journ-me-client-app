// @require journey.journey
(function (angular, undefined) {
    'use strict';

    var app = angular.module('jmJourney');

    app.controller('jmJourneyDetailController', function ($scope, jmJourneyService, jmJourneyActionService, jmJourneyVO, $stateParams, jmAliasVO) {
        $scope.journey = jmJourneyVO;

        var updateFollowing = function () {
            /* the question is whether or not we populate the journey.followers or just keep the ids
             *  -> see also journeyFollowers
             */
            $scope.isFollowing = false;
            var index, len;
            for (index = 0, len = jmJourneyVO.followers.length; index < len; ++index) {
                if (jmJourneyVO.followers[index]._id === jmAliasVO.id) {
                    $scope.isFollowing = true;
                    break;
                }
            }
            //$scope.isFollowing = jmJourneyVO.followers.indexOf(jmAliasVO.id) !== -1;
        };

        jmJourneyService.getJourney($stateParams.journeyId).then(updateFollowing);

        $scope.followJourney = function () {
            jmJourneyActionService.followJourney($scope.journey.id, jmAliasVO.id)
                .then(updateFollowing);
        };

        $scope.unfollowJourney = function () {
            jmJourneyActionService.unfollowJourney($scope.journey.id, jmAliasVO.id)
                .then(updateFollowing);
        };
    });


}(window.angular));