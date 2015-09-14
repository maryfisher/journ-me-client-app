// @require journey.journey
(function (angular, undefined) {
    'use strict';

    var app = angular.module('jmJourney');

    app.controller('jmJourneyDetailController', function ($scope, jmJourneyModel, $stateParams) {
        $scope.journey = jmJourneyModel.getCurrentJourney($stateParams.journeyId);

        $scope.followJourney = function () {
            jmJourneyModel.followJourney();
        };

        $scope.unfollowJourney = function () {
            jmJourneyModel.unfollowJourney();
        };
    });


}(window.angular));