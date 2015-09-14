// @require journey.journey
(function (angular, undefined) {
    'use strict';

    var app = angular.module('jmJourney');

    app.controller('jmLinkJourneyController', function ($scope, $modalInstance, jmAliasModel, jmJourneyModel) {

        //get alias journeys
        $scope.alias = jmAliasModel.getCurrentAlias();

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

        $scope.select = function () {
            jmJourneyModel.linkJourney($scope.selectedJourney);
            $modalInstance.close();
        };
    });

}(window.angular));