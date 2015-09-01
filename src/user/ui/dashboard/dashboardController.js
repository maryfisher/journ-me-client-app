// @require user.user
(function (angular, undefined) {
    'use strict';

    var app = angular.module('jmUser');

    app.controller('jmDashboardController', function ($scope, jmUserService, jmUserDashboardVO, jmUserAuthVO) {

        $scope.user = jmUserDashboardVO;

        var init = function () {
            jmUserService.getUser(jmUserAuthVO.id);
        };

        init();
    });

}(window.angular));