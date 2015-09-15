// @require moment.moment
(function (angular, undefined) {
    'use strict';

    var app = angular.module('jmMoment');

    app.controller('jmMomentEditFormController', function ($scope, jmMomentModel, jmRouteUtil, jmRouteConst, $stateParams) {

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

        $scope.hasMoment = (!!$stateParams.momentId);
        if ($scope.hasMoment) {
            $scope.moment = jmMomentModel.getCurrentMoment($stateParams.momentId);
            if (!$scope.moment.isAlias) {
                $scope.cancel();
            }
        } else {
            $scope.moment = {
                _id: undefined,
                descript: ''
            };
        }

        $scope.save = function () {
            if (!$scope.hasMoment) {
                jmMomentModel.createMoment($scope.moment, $stateParams.journeyId).then(function () {
                    $scope.moment = jmMomentModel.getCurrentMoment();
                    $scope.cancel();
                });
            } else {
                jmMomentModel.updateMoment($scope.moment, $stateParams.journeyId).then($scope.cancel);
            }
        };

    });


}(window.angular));