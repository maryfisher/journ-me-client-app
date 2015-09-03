// @require journey.journey
(function (angular, undefined) {
    'use strict';

    var app = angular.module('jmJourney');

    app.controller('jmJourneyDetailController', function ($scope, jmJourneyService, jmJourneyVO, $routeParams) {
        $scope.journey = jmJourneyVO;

        jmJourneyService.getJourney($routeParams.id);

    });


}(window.angular));