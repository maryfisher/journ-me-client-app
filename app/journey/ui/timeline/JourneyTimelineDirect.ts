module jm {
    export module journey {

        export interface IJourneyTimelineScope extends ng.IScope {
            journeyId: string;
            isEdit: boolean;
            journey: IJourneyDetailVO;
        }

        export class JourneyTimelineDirect implements ng.IDirective {

            static NG_NAME: string = 'jmJourneyTimeline';

            restrict: string = 'E';
            replace: boolean = true;
            templateUrl: any = 'journey/ui/timeline/journeyTimeline.tpl.html';
            scope: any = {
                journeyId: '=',
                hasEdit: '@'
            };
            controller: string = 'JourneyTimelineController';

            constructor($injector: ng.auto.IInjectorService) {

            }
        }
    }
}
/*(function (angular, undefined) {
    'use strict';

    var app = angular.module('jmJourney');

    app.directive('jmJourneyTimeline', function () {
        return {
            templateUrl: 'journey/ui/timeline/journeyTimeline.tpl.html',
            restrict: 'E',
            replace: true,
            scope: {
                journeyId: '=',
                hasEdit: '@'
            },
            controller: 'jmJourneyTimelineController'
        };
    });

}(window.angular));*/