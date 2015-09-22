module jm.journey {

    'use strict';

    export class LinkJourneyDirect extends jm.common.BaseModalDirect {

        static NG_NAME: string = 'jmLinkJourney';

        restrict: string = 'A';
        scope: any = {}

        constructor($injector: ng.auto.IInjectorService) {
            super($injector, 'LinkJourneyModalController', 'journey/ui/link/linkJourney.tpl.html');
        }
    }
}