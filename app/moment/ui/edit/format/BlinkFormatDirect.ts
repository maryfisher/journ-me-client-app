module jm.moment {

    export interface IBlinkFormatScope extends ng.IScope {
        blink: BlinkVO;
    }

    export class BlinkFormatDirect implements ng.IDirective {

        static NG_NAME: string = 'jmBlinkFormat';

        restrict: string = 'E';
        replace: boolean = true;
        templateUrl = (element: ng.IAugmentedJQuery, attrs: ng.IAttributes): string => {
            var format: number = attrs['ngSwitchWhen'] || 0;
            return 'moment/ui/edit/format/blinkFormat' + format + '.tpl.html';
        };
        scope: any = {
            blink: '='
        };
        link = (scope: IBlinkImgScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => {
            element.addClass('row jm-blink-edit');
        }

        constructor($injector: ng.auto.IInjectorService) {

        }
    }
}