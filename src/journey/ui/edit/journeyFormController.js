// @require journey.journey
(function (angular, undefined) {
    'use strict';

    var app = angular.module('jmJourney');

    app.controller('jmJourneyFormController', function ($scope, $modalInstance, journeyId, jmJourneyVO, jmJourneyService, jmRouteUtil) {

        $scope.hasJourney = (!!journeyId);
        if(journeyId){
            $scope.journey = angular.copy(jmJourneyVO);
        }else{
            $scope.journey = jmJourneyVO.getEmptyJourney();
        }

        $scope.save = function () {
            if($scope.journeyForm.$valid){
                if(!$scope.hasJourney) {
                    jmJourneyService.createJourney($scope.journey).then(
                        function () {
                            jmRouteUtil.redirectToJourney(jmJourneyVO.id);
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