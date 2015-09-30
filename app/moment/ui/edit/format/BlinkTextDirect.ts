module jm.moment {

    export interface IBlinkTextScope extends IBlinkFormScope {
        text: string;
    }

    export class BlinkTextDirect extends BlinkFormDirect {

        static NG_NAME: string = 'jmBlinkText';

        templateUrl: string = 'moment/ui/edit/format/blinkText.tpl.html';

        constructor($injector: ng.auto.IInjectorService) {
            super();
        }
    }
}