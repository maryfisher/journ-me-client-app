module jm.moment {

    export class BlinkImgDirect extends BlinkFormElementDirect {

        static NG_NAME: string = 'jmBlinkImg';
        templateUrl: string = 'moment/ui/edit/format/blinkImg.tpl.html';
        controller: string = 'BlinkImgController';

        constructor($injector: ng.auto.IInjectorService) {
            super();
        }
    }
}