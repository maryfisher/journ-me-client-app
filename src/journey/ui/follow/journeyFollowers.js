// @require journey.journey
(function (angular, undefined) {
    'use strict';

    var app = angular.module('jmJourney');

    app.directive('jmJourneyFollowers', function ($modal) {
        return {
            restrict: 'A',
            scope: {
                journey: '@jmJourneyFollowers'
            },
            link: function (scope, element) {
                element.on('click', function () {
                    element[0].blur();
                    $modal.open({
                        scope: scope,
                        animation: true,
                        templateUrl: 'journey/ui/follow/journeyFollowers.tpl.html',
                        controller: function ($scope, $modalInstance) {
                            $scope.journey = JSON.parse($scope.journey);
                            $scope.cancel = function () {
                                $modalInstance.close();
                            };
                        }
                    });
                });
            }
        };
    });

}(window.angular));