module jm.journey {

    export class JourneyListItemDirect extends BaseJourneyDirect {

        static NG_NAME: string = 'jmJourneyListItem';

        restrict: string = 'E';
        replace: boolean = true;
        templateUrl: any = 'journey/ui/list/journeyListItem.tpl.html';

        link: ng.IDirectiveLinkFn = (scope: IBaseJourneyScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => {
            this.parseJourney(scope);
        };

        constructor($injector: ng.auto.IInjectorService) {
            super('@jmJourney');
        }
    }
}