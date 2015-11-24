module jm.journey {

    export class JourneyEditDirect extends jm.common.BaseModalDirect {

        static NG_NAME: string = 'jmJourneyEdit';

        restrict: string = 'A';
        scope: any = {
            journey: '=?jmJourneyEdit'
        };

        constructor($injector: ng.auto.IInjectorService) {
            super($injector, 'JourneyFormController', 'journey/ui/edit/journeyForm.tpl.html');
        }
    }
}