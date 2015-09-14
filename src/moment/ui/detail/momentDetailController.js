// @require moment.moment
(function (angular, undefined) {
    'use strict';

    var app = angular.module('jmMoment');

    app.controller('jmMomentDetailController', function ($scope, jmMomentModel, $stateParams) {
        $scope.moment = jmMomentModel.getCurrentMoment($stateParams.momentId, $stateParams.journeyId);

    });


}(window.angular));