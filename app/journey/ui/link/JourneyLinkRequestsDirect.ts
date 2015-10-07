module jm.journey {

    'use strict';

    export class JourneyLinkRequestsDirect implements ng.IDirective {

        static NG_NAME: string = 'jmJourneyLinkRequests';

        restrict: string = 'A';
        scope: any = {
            journeyStr: '@jmJourneyLinkRequests',
            isTo: '@',
            isFrom: '@'
        }
        controller: string = 'JourneyLinkRequestsController';

        constructor($injector: ng.auto.IInjectorService) {}
    }
}

/*(function (angular, undefined) {
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

}(window.angular));*/