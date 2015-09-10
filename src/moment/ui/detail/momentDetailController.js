// @require moment.moment
(function (angular, undefined) {
    'use strict';

    var app = angular.module('jmMoment');

    app.controller('jmMomentDetailController', function ($scope, jmMomentService, $stateParams) {
        jmMomentService.getMoment($stateParams.momentId, $stateParams.journeyId).then(function (data) {
            $scope.moment = data;
        }, function () {

        });

    });


}(window.angular));