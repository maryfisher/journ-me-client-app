module jm.moment {

    export interface IBlinkCarouselScope extends ng.IScope {
        moment: MomentDetailVO;
        selectedIndex: number;
        canEdit: boolean;
        nextBlink();
        hasNextBlink();
        prevBlink();
        hasPrevBlink();
    }

    export class BlinkCarouselDirect implements ng.IDirective {

        static NG_NAME: string = 'jmBlinkCarousel';

        restrict: string = 'E';
        replace: boolean = true;
        templateUrl: string = 'moment/ui/carousel/blinkCarousel.tpl.html';
        scope: any = {
            moment: '=',
            selectedIndex: '=index',
            canEdit: '@?'
        };
        link = (scope: IBlinkCarouselScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => {

        };
        controller: string = 'BlinkCarouselController';

        constructor($injector: ng.auto.IInjectorService) {

        }
    }
}