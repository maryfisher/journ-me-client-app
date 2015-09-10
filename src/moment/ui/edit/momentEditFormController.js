// @require moment.moment
(function (angular, undefined) {
    'use strict';

    var app = angular.module('jmMoment');

    app.controller('jmMomentEditFormController', function ($scope, jmMomentService, jmRouteUtil, jmRouteConst, $stateParams, moment) {

        $scope.hasMoment = (!!$stateParams.momentId);
        if ($scope.hasMoment) {
            $scope.moment = moment;
        } else {
            $scope.moment = {
                _id: undefined,
                descript: ''
            };
        }

        $scope.save = function () {
            if (!$scope.hasMoment) {
                jmMomentService.createMoment($scope.moment, $stateParams.journeyId).then(function (data) {
                    $scope.moment._id = data._id;
                    $scope.cancel();
                }, function () {

                });
            } else {
                jmMomentService.updateMoment($scope.moment, $stateParams.journeyId).then($scope.cancel, function () {

                });
            }
        };

        $scope.cancel = function () {
            if (!$scope.hasMoment && !$scope.moment._id) {
                jmRouteUtil.redirectTo(jmRouteConst.JOURNEY_DETAIL, {
                    journeyId: $stateParams.journeyId
                });
            } else {
                var momentId = $scope.moment._id || $stateParams.momentId;
                jmRouteUtil.redirectTo(jmRouteConst.MOMENT_DETAIL, {
                    journeyId: $stateParams.journeyId,
                    momentId: momentId
                });
            }
        };

    });


}(window.angular));