// @require user.user
(function (angular, undefined) {
    'use strict';

    var app = angular.module('jmUser');

    app.controller('jmDashboardController', function ($scope, jmAliasService, jmAliasVO) {

        $scope.alias = jmAliasVO;

        jmAliasService.getAlias(jmAliasVO.id);

    });

}(window.angular));