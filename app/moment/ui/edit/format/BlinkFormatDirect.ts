module jm.moment {

    export interface IBlinkFormatScope extends ng.IScope {
        blink: BlinkFormVO;
        maxRange: number;
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
        link = (scope: IBlinkFormatScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => {
            element.addClass('row jm-blink-edit');
        };
        controller: string = 'BlinkFormatController';

        constructor($injector: ng.auto.IInjectorService) {

        }
    }
}