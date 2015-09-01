// @require journey.journey
(function (angular, undefined) {
    'use strict';

    var app = angular.module('jmJourney');

    app.controller('jmJourneyDetailController', function ($scope, jmUserDashboardVO, $routeParams) {
        $scope.journey = jmUserDashboardVO.journeys[$routeParams.id - 1];
    });

}(window.angular));