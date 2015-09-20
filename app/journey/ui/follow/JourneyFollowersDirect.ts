module jm.journey {
    export class JourneyFollowersDirect implements ng.IDirective {
        static NG_NAME: string = 'jmJourneyFollowers';

        restrict: string = 'A';
        scope: any = {
            journeyStr: '@jmJourneyFollowers'
        };
        controller: string = 'JourneyFollowersController';

        constructor($injector: ng.auto.IInjectorService) {}
    }
}