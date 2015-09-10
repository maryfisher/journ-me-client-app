// @require journey.journey
(function (angular, undefined) {
    'use strict';

    var app = angular.module('jmJourney');

    app.controller('jmJourneyDetailController', function ($scope, jmJourneyService, jmJourneyActionService, jmJourneyVO, $stateParams, jmAliasVO) {
        $scope.journey = jmJourneyVO;

        jmJourneyService.getJourney($stateParams.journeyId);

        $scope.followJourney = function () {
            jmJourneyActionService.followJourney($scope.journey.id, jmAliasVO.id)
                .then(
                    function () {

                    },
                    function () {

                    });
        };
    });


}(window.angular));