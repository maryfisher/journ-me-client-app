// @require journey.journey
(function (angular, undefined) {
    'use strict';

    var app = angular.module('jmJourney');

    app.controller('jmJourneyDetailController', function ($scope, jmJourneyService, jmJourneyActionService, jmJourneyVO, $stateParams, jmAliasVO) {
        $scope.journey = jmJourneyVO;

        var updateFollowing = function () {
            $scope.isFollowing = jmJourneyVO.followers.indexOf(jmAliasVO.id) !== -1;
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