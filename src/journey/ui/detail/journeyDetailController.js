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
            $scope.selectedLinkedJourney = journey;
        };

        $scope.isSelected = function (id) {
            return $scope.selectedLinkedJourney && $scope.selectedLinkedJourney._id === id;
        };
    });


}(window.angular));