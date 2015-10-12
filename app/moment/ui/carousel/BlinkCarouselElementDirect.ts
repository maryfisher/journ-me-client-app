module jm.moment {

    export interface IBlinkCarouselScope extends ng.IScope {
        ratio: number;
        image: string;
        text: string;
    }

    export class BlinkCarouselElementDirect implements ng.IDirective {

        static NG_NAME: string = 'jmBlinkElm';

        restrict: string = 'E';
        replace: boolean = true;
        templateUrl = (element: ng.IAugmentedJQuery, attrs: ng.IAttributes): string => {
            var isImage:boolean = (!!attrs['image']);
            if(isImage){
                return 'moment/ui/carousel/blinkImg.tpl.html';
            }
            return 'moment/ui/carousel/blinkText.tpl.html';
        };
        scope: any = {
            ratio: '@',
            image: '@?',
            text: '@?'
        };
        link = (scope: IBlinkCarouselScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => {

        };

        constructor($injector: ng.auto.IInjectorService) {

        }
    }
}