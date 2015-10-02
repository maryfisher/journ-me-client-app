module jm.moment {

    export class BlinkTextDirect extends BlinkFormElementDirect {

        static NG_NAME: string = 'jmBlinkText';

        templateUrl: string = 'moment/ui/edit/format/blinkText.tpl.html';

        constructor($injector: ng.auto.IInjectorService) {
            super();
        }
    }
}