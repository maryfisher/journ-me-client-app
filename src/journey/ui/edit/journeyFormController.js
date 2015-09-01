// @require journey.journey
(function (angular, undefined) {
    'use strict';

    var app = angular.module('jmJourney');

    app.controller('jmJourneyFormController', function ($scope, $modalInstance, journeyId, jmUserDashboardVO) {

        $scope.journey = jmUserDashboardVO.journeys[journeyId - 1];

        $scope.hasJourney = function () {
            return (!!$scope.journey);
        };

        $scope.save = function () {
            
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    });

}(window.angular));