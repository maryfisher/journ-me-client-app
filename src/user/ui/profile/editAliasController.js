// @require user.user
(function (angular, undefined) {
    'use strict';

    var app = angular.module('jmUser');

    app.controller('jmEditAliasController', function ($scope, jmAliasModel) {
        $scope.alias = jmAliasModel.getCurrentAlias();

        $scope.saveChanges = function () {
            if ($scope.file && !$scope.file.$error) {
                $scope.upload($scope.file);
            }
        };

        $scope.upload = function (file) {
            jmAliasModel.updateAlias(file);
        };
    });


}(window.angular));