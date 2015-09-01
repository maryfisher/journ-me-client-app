// @require journey.journey
(function (angular, undefined) {
    'use strict';

    var app = angular.module('jmJourney');

    app.controller('jmJourneyFormController', function ($scope, $modalInstance, journeyId, jmUserDashboardVO, jmJourneyVO, jmJourneyService) {

        var journey = jmUserDashboardVO.getJourney(parseInt(journeyId));
        $scope.hasJourney = (!!journey);
        if(!journey){
            jmJourneyVO.invalidateJourney();
        }else{
            jmJourneyVO.setJourney(journey);
        }
        $scope.journey = jmJourneyVO;

        $scope.save = function () {
            if($scope.journeyForm.$valid){
                if(!$scope.hasJourney) {
                    jmJourneyService.createJourney($scope.journey).then(
                        function () {
                            $modalInstance.close();
                        },
                        function () {

                        }
                    );
                }else{
                    jmJourneyService.updateJourney($scope.journey).then(
                        function () {
                            $modalInstance.close();
                        },
                        function () {

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