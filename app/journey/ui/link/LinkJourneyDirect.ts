module jm.journey {

    'use strict';

    export class LinkJourneyDirect implements ng.IDirective {

        static NG_NAME: string = 'jmLinkJourney';

        restrict: string = 'A';
        scope: any = {}
        controller: string = 'LinkJourneyController';

        constructor($injector: ng.auto.IInjectorService) {}
    }
}