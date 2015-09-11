// @require journey.journey
(function (angular, undefined) {
    'use strict';

    var app = angular.module('jmJourney');

    app.controller('jmJourneyFormController', function ($scope, $modalInstance, jmJourneyVO, jmJourneyService, jmRouteUtil) {

        $scope.hasJourney = (!!$scope.journey);
        if ($scope.hasJourney) {
            $scope.journey = JSON.parse($scope.journey);
        } else {
            $scope.journey = jmJourneyVO.getEmptyJourney();
        }

        $scope.save = function () {
            if ($scope.journeyForm.$valid) {
                if (!$scope.hasJourney) {
                    jmJourneyService.createJourney($scope.journey).then(
                        function () {
                            jmRouteUtil.redirectToJourney(jmJourneyVO.id);
                            $modalInstance.close();
                        }
                    );
                } else {
                    jmJourneyService.updateJourney($scope.journey).then(
                        function () {
                            $modalInstance.close();
                        }
                    );
                }
            }
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    });

}(window.angular));