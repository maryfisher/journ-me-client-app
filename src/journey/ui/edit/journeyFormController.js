// @require journey.journey
(function (angular, undefined) {
    'use strict';

    var app = angular.module('jmJourney');

    app.controller('jmJourneyFormController', function ($scope, $modalInstance, jmJourneyModel, jmRouteUtil) {

        $scope.hasJourney = (!!$scope.journey);
        if ($scope.hasJourney) {
            $scope.journey = jmJourneyModel.getCurrentJourney();
        } else {
            $scope.journey = jmJourneyModel.getEmptyJourney();
        }

        $scope.save = function () {
            if ($scope.journeyForm.$valid) {
                if (!$scope.hasJourney) {
                    jmJourneyModel.createJourney($scope.journey).then(
                        function () {
                            jmRouteUtil.redirectToJourney(jmJourneyModel.getCurrentJourney._id);
                            $modalInstance.close();
                        }
                    );
                } else {
                    jmJourneyModel.updateJourney($scope.journey).then(
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