module jm.journey {

    export class JourneyListItemDirect implements ng.IDirective {

        static NG_NAME: string = 'jmJourneyListItem';

        restrict: string = 'E';
        replace: boolean = true;
        templateUrl: any = 'journey/ui/list/journeyListItem.tpl.html';
        scope: any = {
            journey: '=jmJourney'
        };

        constructor($injector: ng.auto.IInjectorService) {

        }
    }
}