// @require user.user
(function (angular, undefined) {
    'use strict';

    var app = angular.module('jmUser');

    app.controller('jmDashboardController', function ($scope, jmUserService, jmUserDashboardVO, jmUserAuthVO) {

        $scope.user = jmUserDashboardVO;

        jmUserService.getUser(jmUserAuthVO.id);

    });

}(window.angular));