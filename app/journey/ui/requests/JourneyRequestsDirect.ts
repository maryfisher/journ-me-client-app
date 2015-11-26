module jm.journey {

    'use strict';

    export class JourneyRequestsDirect extends jm.common.BaseModalDirect {

        static NG_NAME: string = 'jmJourneyRequests';

        restrict: string = 'A';
        scope: any = {
            journey: '=jmJourneyRequests',
            isTo: '@',
            isFrom: '@'
        }

        constructor($injector: ng.auto.IInjectorService) {
            super($injector, 'JourneyRequestsModalController', 'journey/ui/requests/journeyRequests.tpl.html');
        }
    }
}