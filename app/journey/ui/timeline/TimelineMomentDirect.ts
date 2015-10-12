module jm.journey {

    import MomentBaseVO = jm.moment.MomentBaseVO;

    export interface ITimelineMomentScope extends ng.IScope {
        moment: jm.moment.IMomentBaseVO;
        getMomentClass(moment: MomentBaseVO): string;
        setSelected(moment: MomentBaseVO);
    }

    export class TimelineMomentDirect implements ng.IDirective {

        static NG_NAME: string = 'jmTimelineMoment';

        require: string = '^jmJourneyTimeline';
        restrict: string = 'E';
        replace: boolean = true;
        templateUrl: any = 'journey/ui/timeline/timelineMoment.tpl.html';
        scope: any = {
            moment: '=jmMoment'
        };

        link: ng.IDirectiveLinkFn = (scope: ITimelineMomentScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes, timelineController: ctrl.JourneyTimelineController) => {
            scope.setSelected = timelineController.setSelected;
            scope.getMomentClass = timelineController.getMomentClass;
            timelineController.addMomentElm(scope.moment, element);
        };

        constructor($injector: ng.auto.IInjectorService) {

        }
    }
}