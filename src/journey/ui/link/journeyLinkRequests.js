// @require journey.journey
(function (angular, undefined) {
    'use strict';

    var app = angular.module('jmJourney');

    app.directive('jmJourneyLinkRequests', function ($modal, jmJourneyModel) {
        return {
            restrict: 'A',
            scope: {
                journey: '@jmJourneyLinkRequests',
                isTo: '@',
                isFrom: '@'
            },
            link: function (scope, element) {
                element.on('click', function () {
                    element[0].blur();
                    $modal.open({
                        scope: scope,
                        animation: true,
                        templateUrl: 'journey/ui/link/journeyLinkRequests.tpl.html',
                        controller: function ($scope, $modalInstance) {
                            $scope.journey = JSON.parse($scope.journey);
                            $scope.cancel = function () {
                                $modalInstance.close();
                            };

                            $scope.linkJourney = function (linkingFromJourney) {
                                jmJourneyModel.linkBackJourney($scope.journey, linkingFromJourney);
                                $modalInstance.close();
                            };
                        }
                    });
                });
            }
        };
    });

}(window.angular));