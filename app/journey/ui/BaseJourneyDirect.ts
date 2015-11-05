module jm.journey {

    export interface IBaseJourneyScope extends ng.IScope {
        journey: JourneyBaseVO;
        journeyDetail: JourneyDetailVO;
        journeyStr: string;
        element: ng.IAugmentedJQuery;
    }

    export class BaseJourneyDirect implements ng.IDirective {

        scope: any;

        constructor(attrName: string) {
            this.scope = {
                journeyStr: attrName
            };
        }

        parseJourney(scope: IBaseJourneyScope) {
            if (scope.journeyStr) {
                scope.journey = JSON.parse(scope.journeyStr);
            }
        }
    }
}