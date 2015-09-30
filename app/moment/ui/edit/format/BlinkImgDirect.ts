module jm.moment {

    export interface IBlinkImgScope extends IBlinkFormScope {
        imageFile: File;
        image: string;
    }

    export class BlinkImgDirect extends BlinkFormDirect {

        static NG_NAME: string = 'jmBlinkImg';
        templateUrl: string = 'moment/ui/edit/format/blinkImg.tpl.html';
        controller: string = 'BlinkImgController';

        constructor($injector: ng.auto.IInjectorService) {
            super();
        }
    }
}