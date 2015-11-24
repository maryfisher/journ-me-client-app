module jm.common {
    'use strict';

    export class ConvertToNumberDirect implements ng.IDirective {

        static NG_NAME: string = 'jmConvertToNumber';

        restrict: string = 'A';
        require: string = 'ngModel';
        link = (scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes, ngModel: ng.INgModelController) => {
            ngModel.$parsers.push(function (val: string): number {
                return parseInt(val, 10);
            });
            ngModel.$formatters.push(function (val: number): string {
                return '' + val;
            });
        };

        constructor($injector: ng.auto.IInjectorService) {
        }
    }
}