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

        $scope.selectedLinkedJourney = undefined;

        $scope.setSelected = function (journey) {
            if ($scope.selectedLinkedJourney === journey) {
                $scope.selectedLinkedJourney = undefined;
            } else {
                $scope.selectedLinkedJourney = journey;
            }
        };

        $scope.isNotSelected = function (id) {
            return !($scope.selectedLinkedJourney && $scope.selectedLinkedJourney._id === id);
        };
    });


}(window.angular));