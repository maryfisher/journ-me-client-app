module jm.common {
    'use strict';

    //TODO: cannot extract into util file until compilation reference order is respected
    class NumberUtil {

        static numberToString(val: number): string {
            return '' + val;
        }

        static stringToNumber(val: string): number {
            return parseInt(val, 10);
        }

    }

    export class ConvertToNumberDirect implements ng.IDirective {

        static NG_NAME: string = 'jmConvertToNumber';

        restrict: string = 'A';
        require: string = 'ngModel';
        link = (scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes, ngModel: ng.INgModelController) => {
            ngModel.$parsers.push(NumberUtil.stringToNumber);
            ngModel.$formatters.push(NumberUtil.numberToString);
        };

        constructor($injector: ng.auto.IInjectorService) {
        }
    }
}