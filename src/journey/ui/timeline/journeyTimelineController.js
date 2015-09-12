// @require journey.journey
(function (angular, undefined) {
    'use strict';

    var app = angular.module('jmJourney');

    app.controller('jmJourneyTimelineController', function ($scope, jmJourneyModel) {
        $scope.$watch('journeyId', function () {
            if (!$scope.journeyId) {
                return;
            }
            $scope.journey = jmJourneyModel.getJourney($scope.journeyId);
        });

    });

}(window.angular));