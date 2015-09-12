// @require user.user
(function (angular, undefined) {
    'use strict';

    var app = angular.module('jmUser');

    app.controller('jmDashboardController', function ($scope, jmAliasModel) {
        $scope.alias = jmAliasModel.getCurrentAlias();
    });

}(window.angular));