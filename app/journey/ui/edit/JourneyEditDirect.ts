///<reference path="JourneyEditFormController.ts"/>
module jm.journey {

    import JourneyEditFormController = jm.journey.ctrl.JourneyEditFormController;

    export class JourneyEditDirect extends jm.common.BaseModalDirect {

        static NG_NAME: string = 'jmJourneyEdit';

        restrict: string = 'A';
        scope: any = {
            journey: '=?jmJourneyEdit'
        };

        constructor($injector: ng.auto.IInjectorService) {
            super($injector, JourneyEditFormController.NG_NAME, 'journey/ui/edit/journeyEditForm.tpl.html');
        }
    }
}