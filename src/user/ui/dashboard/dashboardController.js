// @require user.user
(function (angular, undefined) {
    'use strict';

    var app = angular.module('jmUser');

    app.controller('jmDashboardController', function ($scope, jmUserDashboardVO) {

        $scope.journeys = jmUserDashboardVO.journeys;
    });

}(window.angular));