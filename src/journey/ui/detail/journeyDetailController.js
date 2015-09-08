// @require journey.journey
(function (angular, undefined) {
    'use strict';

    var app = angular.module('jmJourney');

    app.controller('jmJourneyDetailController', function ($scope, jmJourneyService, jmJourneyVO, $stateParams) {
        $scope.journey = jmJourneyVO;

        jmJourneyService.getJourney($stateParams.id);

    });


}(window.angular));