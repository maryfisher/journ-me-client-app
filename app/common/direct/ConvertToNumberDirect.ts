module jm.common {
    'use strict';

    import NumberUtil = jm.common.NumberUtil;

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