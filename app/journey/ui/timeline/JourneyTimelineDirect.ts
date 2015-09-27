module jm.journey {

    export interface IJourneyTimelineScope extends ng.IScope {
        journeyId: string;
        hasEdit: boolean;
        journey: IJourneyDetailVO;
        selectedMoment: jm.moment.IMomentBaseVO;
        selectedIndex: number;
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